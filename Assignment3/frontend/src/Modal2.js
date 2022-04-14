import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
	Col,
} from "reactstrap";
import axios from "axios";

export default class CustomModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		const { toggle, onSave, song } = this.props;
	}

	handleChange = (e) => {
		const field = e.target.name;
		if (field === "artist") this.setState({ artist: e.target.value });
		else if (field === "song") this.setState({ song: e.target.value });
		else if (field === "rating") this.setState({ rating: e.target.value });
	};

	render() {
		const { toggle, onSave, song } = this.props;

		return (
			<Modal isOpen={true} toggle={toggle}>
				{song ? (
					<ModalHeader toggle={toggle}>Edit Song</ModalHeader>
				) : (
					<ModalHeader toggle={toggle}>Rate Song</ModalHeader>
				)}
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>song </Label>
							<Input
								className="w-auto"
								type="text"
								id="song"
								name="song"
								placeholder={song ? song.song : "song"}
								onChange={this.handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label>artist </Label>
							<Input
								className="w-auto"
								type="text"
								id="artist"
								placeholder={song ? song.artist : "artist"}
								name="artist"
								onChange={this.handleChange}
							/>
						</FormGroup>
						{song ? null : (
							<FormGroup row>
								<Input
									className="w-auto"
									type="number"
									id="rating"
									name="rating"
									onChange={this.handleChange}
									min="1"
									max="5"
								/>
								<Col> /5</Col>
								<Row>
									<p>Please enter an interger between 1 and 5 (inclusive).</p>
								</Row>
							</FormGroup>
						)}
					</Form>
				</ModalBody>
				<ModalFooter>
					{!song ? (
						<Button
							disabled={
								[1, 2, 3, 4, 5].includes(parseFloat(this.state.rating)) &&
								this.state.song &&
								this.state.artist
									? false
									: true
							}
							onClick={() => {
								axios
									.get(
										"http://127.0.0.1:8000/rater/song-in-db/" +
											this.state.song +
											"/" +
											this.props.username
									)
									.then((res) => {
										if (res.data["exists"]) {
											toggle();
											alert(
												"Cannot rate song. Song already rated. You may modify an existing song's rating in 'Your Ratings'"
											);
										} else
											onSave(
												this.state.song,
												this.state.rating,
												this.state.artist
											);
									});
							}}
						>
							Rate
						</Button>
					) : (
						<Button
							disabled={this.state.song || this.state.artist ? false : true}
							onClick={() => {
								axios
									.get(
										"http://127.0.0.1:8000/rater/song-in-db/" +
											this.state.song +
											"/" +
											this.props.username
									)
									.then((res) => {
										if (res.data["exists"]) {
											toggle();
											alert(
												"Cannot rate song. Song already rated. You may modify an existing song's rating in 'Your Ratings'"
											);
										} else onSave(this.state.song, this.state.artist);
									});
							}}
						>
							Edit
						</Button>
					)}
				</ModalFooter>
			</Modal>
		);
	}
}
