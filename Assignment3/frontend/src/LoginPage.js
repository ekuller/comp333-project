import React from "react";
import { Button } from "reactstrap";
import { ReactSession } from "react-client-session";

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { sessionID: ReactSession.get("sessionID") };
	}

	AuthURL() {
		const loginURL = new URL("https://accounts.spotify.com/authorize?");
		loginURL.searchParams.append("scope", "user-top-read");
		loginURL.searchParams.append("response_type", "code");
		loginURL.searchParams.append(
			"redirect_uri",
			"http://127.0.0.1:8000/rater/redirect"
		);
		loginURL.searchParams.append(
			"client_id",
			"3d3ba5a677f4428f9c12f7d7e79cfcec"
		);
		loginURL.searchParams.append("state", this.props.sessionID);
		loginURL.searchParams.append("show_dialog", "show_dialog=true");
		return loginURL;
	}

	render() {
		if (this.props.loginStatus) {
			return (
				<div>
					Welcome, {this.props.loginStatus}
					<Button type="submit" onClick={() => this.props.handleLogout()}>
						Logout
					</Button>
				</div>
			);
		} else {
			return (
				<Button
					type="submit"
					onClick={() => window.location.replace(this.AuthURL())}
				>
					Login Or Signup With Spotify
				</Button>
			);
		}
	}
}
