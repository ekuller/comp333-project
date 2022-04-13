import React from "react";
import { ReactSession } from "react-client-session";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import axios from "axios";

import { Container, Row, Col, Button, Badge } from "reactstrap";
import classnames from "classnames";

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
	}
	getTopSongs() {
		const sessionId = ReactSession.get("sessionID");
		axios
			.get("http://127.0.0.1:8000/rater/get-top-songs/" + sessionId)
			.then((res) =>
				this.setState({
					songs: res.data["songs"],
				})
			);
	}

	toggle = () => {
		this.setState({ modifyModal: !this.state.modifyModal });
	};

	addRating(song, rating) {
		axios.post("http://127.0.0.1:8000/rater/rate", {
			song: song.song,
			rating: rating,
			username: this.props.username,
		});
	}

	handleSubmit = (song, rating) => {
		this.toggle();

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

	renderItems = () => {
		const songs = this.state.songs;
		return songs?.map((song) => (
			<div>
				<Badge color="primary" pill>
					{song.call}
				</Badge>
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
					<Col className="w-auto">
						<Button onClick={() => this.modifyRating(song)} type="submit">
							Add Rating
						</Button>
					</Col>
					<Col className="w-auto">
						<Button onClick={() => this.notInterested(song)} type="submit">
							Not Interested in Rating
						</Button>
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
