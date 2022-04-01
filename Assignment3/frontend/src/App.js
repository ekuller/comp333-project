import React, { Component } from "react";
import { render } from "react-dom";
import LoginPage from "./LoginPage";

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <LoginPage />;
	}
}

const appDiv = document.getElementById("root");
render(<App />, appDiv);
