import React from "react";
import { ReactSession } from "react-client-session";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import axios from "axios";
import Modal2 from "./Modal2";

import { Container, Row, Col, Button, Badge } from "reactstrap";

export default class YourRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionID: ReactSession.get("sessionID"),
      songs: this.props.songs,
      modifyModal: false,
      editModal: false,
      activeSong: {
        song: "",
        key: "",
        url: "",
        artist: "",
        call: "",
      },
    };
    if (this.props.yourRatings) this.getRatings();
    if (this.props.social) this.getSumRatings();
  }

  toggle = () => {
    this.setState({ modifyModal: !this.state.modifyModal });
  };

  toggle2 = () => {
    this.setState({ editModal: !this.state.editModal });
  };

  addRating(song, rating) {
    return axios.post("http://127.0.0.1:8000/rater/rate/", {
      song: song,
      rating: rating,
      username: this.props.username,
    });
  }
  handleSubmit2 = (song, artist) => {
    this.toggle2();
    const key = this.state.activeSong.key;
    const currSongs = this.state.songs;
    const index = currSongs.findIndex((element) => {
      if (element.key === key) {
        return true;
      }
    });
    currSongs[index].song = song ? song : currSongs[index].song;
    currSongs[index].artist = artist ? artist : currSongs[index].artist;
    this.setState({
      songs: currSongs,
    });
    axios.put(
      "http://127.0.0.1:8000/rater/edit-song/" +
        key +
        "/" +
        currSongs[index].artist +
        "/" +
        currSongs[index].song
    );
  };

  handleSubmit = (song, rating) => {
    this.toggle();
    if (this.props.yourRatings | song.rating) {
      axios
        .put("http://127.0.0.1:8000/rater/rate/" + song.key + "/", {
          rating: rating,
          song: song.song,
          username: this.props.username,
        })
        .then(() => {
          if (this.props.social) {
            this.getSumRatings();
          }
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
      if (!this.props.social & !song.exists) {
        axios
          .post("http://127.0.0.1:8000/rater/song", {
            song: song.song,
            artist: song.artist,
            trackId: song.key,
          })
          .then(() => this.addRating(song.song, rating));
      } else
        this.addRating(song.song, rating).then(() => {
          if (this.props.social) {
            this.getSumRatings();
          }
        });
      if (!this.props.yourRatings & !this.props.social) this.swapSong(song);
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
        // currSongs.splice(index, 1);
        // currSongs.push(res.data["newSong"]);
        currSongs[index] = res.data["newSong"];
        //console.log(res.data["newSong"]);
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

  editSong = (song) => {
    this.setState({
      activeSong: song,
      editModal: !this.state.modifyModal,
    });
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

  getSumRatings() {
    const user = this.props.username;
    axios
      .get("http://127.0.0.1:8000/rater/get-ratings-summary/" + user)
      .then((res) =>
        this.setState({
          songs: res.data,
        })
      );
  }

  deleteRating(song) {
    axios
      .delete("http://127.0.0.1:8000/rater/rate/" + song.key + "/")
      .then(() => {
        this.getRatings();
        axios.delete("http://127.0.0.1:8000/rater/delete-song/" + song.song);
      });
  }

  renderItems = () => {
    const songs = [...new Set(this.state.songs)];
    return songs?.map((song) => (
      <div
        style={{
          border: "2px solid black",
          padding: "3px",
        }}
        key={song.song}
      >
        {this.props.yourRatings ? null : (
          <Badge color="primary" pill>
            {song.call}
          </Badge>
        )}
        <Row xs="4">
          <Col className="w-50">
            {song.url ? (
              <iframe
                src={song.url}
                width="100%"
                height="80"
                title={song}
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
            ) : (
              <div>
                "{song.song}" by {song.artist}
              </div>
            )}
          </Col>
          {this.props.yourRatings ? (
            <Col className="w-auto">{song.rating}/5</Col>
          ) : null}
          {this.props.social ? (
            <Col className="w-auto">
              <Row>Avg Rating: {song.average}/5 </Row>
              {song.rating ? (
                <Row className="w-auto">Your Rating: {song.rating}/5</Row>
              ) : null}
            </Col>
          ) : null}
          <Col className="w-auto">
            {this.props.yourRatings | song.rating ? (
              <Button
                style={{
                  margin: "5px",
                }}
                onClick={() => this.modifyRating(song)}
                type="submit"
              >
                Modify Rating
              </Button>
            ) : (
              <Button onClick={() => this.modifyRating(song)} type="submit">
                Add Rating
              </Button>
            )}
          </Col>
          {this.props.social ? null : (
            <Col className="w-auto">
              {this.props.yourRatings ? (
                <Row>
                  <Button
                    style={{
                      margin: "5px",
                    }}
                    onClick={() => this.deleteRating(song)}
                    type="submit"
                  >
                    Delete Rating
                  </Button>
                </Row>
              ) : (
                <Button onClick={() => this.notInterested(song)} type="submit">
                  Not Interested in Rating
                </Button>
              )}
              {this.props.yourRatings & !song.url ? (
                <Row>
                  <Button
                    style={{
                      margin: "5px",
                    }}
                    onClick={() => this.editSong(song)}
                    type="submit"
                  >
                    Edit Song
                  </Button>
                </Row>
              ) : null}
            </Col>
          )}
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
        {this.state.editModal ? (
          <Modal2
            toggle={this.toggle2}
            onSave={this.handleSubmit2}
            song={this.state.activeSong}
            username={this.props.username}
          />
        ) : null}
      </div>
    );
  }
}
