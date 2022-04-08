import React, { Component } from "react";
import { render } from "react-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
		};
	}

	render() {
		if (this.state.authenticated) {
			return <LoginPage />;
		} else {
			return <LoginPage />;
		}
	}
}

const appDiv = document.getElementById("root");
render(<App />, appDiv);
