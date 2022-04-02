import React from "react";
// We would like to use a modal (small window) to show details of a task.
import { Button } from "reactstrap";

export default class LoginPage extends React.Component {
	authenticateSpotify() {
		fetch("http://localhost:8000/rater/is-authenticated")
			.then((response) => response.json())
			.then((data) => {
				// if (!data.status) {
				fetch("http://localhost:8000/rater/get-auth-url")
					.then((response) => response.json())
					.then((data) => {
						window.location.replace(data.url);
					});
				// }
			});
	}

	render() {
		return (
			<div>
				<Button onClick={this.authenticateSpotify} type="submit">
					Login Or Signup With Spotify
				</Button>
			</div>
		);
	}
}
