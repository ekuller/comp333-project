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
} from "reactstrap";

export default class CustomModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { toggle, onSave } = this.props;

		return (
			<Modal isOpen={true} toggle={toggle}>
				<ModalHeader toggle={toggle}>Todo Item</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="todo-title">Title</Label>
							<Input
								type="text"
								id="todo-title"
								name="title"
								placeholder="Enter Todo Title"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="todo-description">Description</Label>
							<Input
								type="text"
								id="todo-description"
								name="description"
								placeholder="Enter Todo description"
							/>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input type="checkbox" name="completed" />
								Completed
							</Label>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button></Button>
				</ModalFooter>
			</Modal>
		);
	}
}
