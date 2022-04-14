import React from "react";
import { ReactSession } from "react-client-session";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import axios from "axios";

import { Container, Row, Col, Button, Badge } from "reactstrap";

export default class YourRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionID: ReactSession.get("sessionID"),
      songs: this.props.songs,
      modifyModal: false,
      activeSong: {
        song: "",
        key: "",
        url: "",
        artist: "",
        call: "",
      },
    };
    console.log(this.state.songs);
    if (this.props.yourRatings) this.getRatings();
  }

  toggle = () => {
    this.setState({ modifyModal: !this.state.modifyModal });
  };

  addRating(song, rating) {
    axios.post("http://127.0.0.1:8000/rater/rate/", {
      song: song,
      rating: rating,
      username: this.props.username,
    });
  }

  handleSubmit = (song, rating) => {
    this.toggle();
    if (this.props.yourRatings) {
      axios.put("http://127.0.0.1:8000/rater/rate/" + song.key + "/", {
        rating: rating,
        song: song.song,
        username: this.props.username,
      });
      const currSongs = this.state.songs;
      const index = currSongs.findIndex((element) => {
        if (element.key === song.key) {
          return true;
        }
      });
      currSongs[index].rating = rating;
      this.setState({
        songs: currSongs,
      });
    } else {
      if (!song.exists) {
        axios
          .post("http://127.0.0.1:8000/rater/song", {
            song: song.song,
            artist: song.artist,
            trackId: song.key,
          })
          .then(() => this.addRating(song.song, rating));
      } else this.addRating(song.song, rating);
      this.swapSong(song);
    }
  };

  swapSong = (song) => {
    const currSongs = this.state.songs;
    const sessionId = ReactSession.get("sessionID");
    const index = currSongs.findIndex((element) => {
      if (element.key === song.key) {
        return true;
      }
    });
    axios
      .get(
        "http://127.0.0.1:8000/rater/get-new-rec/" + sessionId + "/" + song.key
      )
      .then((res) => {
        currSongs.splice(index, 1);
        currSongs.push(res.data["newSong"]);
        // currSongs[index] = res.data["newSong"];
        console.log(res.data["newSong"]);
        this.setState({
          songs: currSongs,
        });
      });
  };

  notInterested = (song) => {
    this.swapSong(song);
  };

  modifyRating = (song) => {
    this.setState({
      activeSong: song,
      modifyModal: !this.state.modifyModal,
    });
  };
  getRatings() {
    const user = this.props.username;
    axios.get("http://127.0.0.1:8000/rater/get-ratings/" + user).then((res) =>
      this.setState(
        {
          songs: res.data,
        },
        console.log(res.data)
      )
    );
  }

  deleteRating(id) {
    axios
      .delete("http://127.0.0.1:8000/rater/rate/" + id + "/")
      .then(() => this.getRatings());
  }

  renderItems = () => {
    const songs = this.state.songs;
    return songs?.map((song) => (
      <div>
        {this.props.yourRatings ? null : (
          <Badge color="primary" pill>
            {song.call}
          </Badge>
        )}
        <Row xs="4">
          <Col className="w-auto">
            <iframe
              src={song.url}
              width="100%"
              height="80"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
          </Col>
          {this.props.yourRatings ? (
            <Col className="w-auto">{song.rating}/5</Col>
          ) : null}
          <Col className="w-auto">
            {this.props.yourRatings ? (
              <Button onClick={() => this.modifyRating(song)} type="submit">
                Modify Rating
              </Button>
            ) : (
              <Button onClick={() => this.modifyRating(song)} type="submit">
                Add Rating
              </Button>
            )}
          </Col>
          <Col className="w-auto">
            {this.props.yourRatings ? (
              <Button onClick={() => this.deleteRating(song.key)} type="submit">
                Delete Rating
              </Button>
            ) : (
              <Button onClick={() => this.notInterested(song)} type="submit">
                Not Interested in Rating
              </Button>
            )}
          </Col>
        </Row>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <div>
          <Container>{this.renderItems()} </Container>
        </div>
        {this.state.modifyModal ? (
          <Modal
            song={this.state.activeSong}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}
