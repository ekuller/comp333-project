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

export default class CustomModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleChange = (e) => {
		const field = e.target.name;
		if (field === "artist") this.setState({ artist: e.target.value });
		else if (field === "song") this.setState({ song: e.target.value });
		else if (field === "rating") this.setState({ rating: e.target.value });
	};

	render() {
		const { toggle, onSave } = this.props;

		return (
			<Modal isOpen={true} toggle={toggle}>
				<ModalHeader toggle={toggle}>Rate Song</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Input
								className="w-auto"
								type="text"
								id="song"
								name="song"
								placeholder="song"
								onChange={this.handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Input
								className="w-auto"
								type="text"
								id="artist"
								placeholder="artist"
								name="artist"
								onChange={this.handleChange}
							/>
						</FormGroup>
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
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						disabled={
							[1, 2, 3, 4, 5].includes(parseFloat(this.state.rating)) &&
							this.state.song &&
							this.state.artist
								? false
								: true
						}
						onClick={() =>
							onSave(this.state.song, this.state.rating, this.state.artist)
						}
					>
						Rate
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}
