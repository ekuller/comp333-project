import React from "react";
import { ReactSession } from "react-client-session";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import axios from "axios";

import { Container, Row, Col, Button } from "reactstrap";
import classnames from "classnames";

export default class YourRatings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sessionID: ReactSession.get("sessionID"),
			modifyModal: false,
		};
		this.getTopSongs();
		console.log(this.state.songs);
	}
	getTopSongs() {
		const sessionId = ReactSession.get("sessionID");
		axios
			.get("http://127.0.0.1:8000/rater/get-top-songs/" + sessionId)
			.then((res) =>
				this.setState({
					songs: res.data["topSongs"],
				})
			);
	}

	modifyRating = () => {
		this.setState({ modifyModal: !this.state.modifyModal });
	};

	renderItems = () => {
		const songs = this.state.songs;
		return songs?.map((song) => (
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
					<Button onClick={() => this.modifyRating(song.key)} type="submit">
						Add Rating
					</Button>
				</Col>
				<Col className="w-auto">
					<Button onClick={this.deleteSong} type="submit">
						Not Interested in Rating
					</Button>
				</Col>
			</Row>
		));
	};

	render() {
		return (
			<div>
				<div>
					<Container>{this.renderItems()} </Container>
				</div>
				{this.state.modifyModal ? <Modal /> : null}
			</div>
		);
	}
}
