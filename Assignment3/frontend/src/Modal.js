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
		this.state = {
			song: this.props.song,
		};
	}

	handleChange = (e) => {
		this.setState({ rating: e.target.value });
	};

	render() {
		const { toggle, onSave } = this.props;

		return (
			<Modal isOpen={true} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					Rate "{this.props.song.song}" by {this.props.song.artist}
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup row inline>
							<Row>
								<Input
									className="w-auto"
									type="number"
									id="rating"
									name="rating"
									onChange={this.handleChange}
									min="0"
									max="5"
									placeholder={this.props.song.rating}
								/>
								<Col> /5</Col>
							</Row>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button onClick={() => onSave(this.state.song, this.state.rating)}>
						Rate
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}
