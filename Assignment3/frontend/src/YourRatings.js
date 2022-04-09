import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";

import { Container, Row, Col, Button } from "reactstrap";
import classnames from "classnames";

export default class YourRatings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modifyModal: false,
			ratings: [
				{
					key: 1,
					url:
						"https://open.spotify.com/embed/track/7lEptt4wbM0yJTvSG5EBof?utm_source=generator",
					rating: 4,
				},
				{
					key: 2,
					url:
						"https://open.spotify.com/embed/track/7lEptt4wbM0yJTvSG5EBof?utm_source=generator",
					rating: 3,
				},
			],
		};
	}

	modifyRating = () => {
		this.setState({ modifyModal: !this.state.modifyModal });
	};

	renderItems = () => {
		const ratings = this.state.ratings;
		return ratings.map((item) => (
			<Row xs="4">
				<Col className="w-auto">
					<iframe
						src={item.url}
						width="100%"
						height="80"
						frameBorder="0"
						allowFullScreen=""
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					></iframe>
				</Col>
				<Col className="w-auto">{item.rating}/5</Col>
				<Col className="w-auto">
					<Button onClick={() => this.modifyRating(item.key)} type="submit">
						Modify Rating
					</Button>
				</Col>
				<Col className="w-auto">
					<Button onClick={this.deleteRating} type="submit">
						Delete Rating
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
