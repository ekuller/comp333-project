import React from "react";
import "react-tabs/style/react-tabs.css";
import YourRatings from "./YourRatings";
import ListenRate from "./ListenRate";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { Spinner } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getTopSongs();
	}

	getTopSongs() {
		const sessionId = ReactSession.get("sessionID");
		axios
			.get("http://127.0.0.1:8000/rater/get-top-songs/" + sessionId)
			.then((res) =>
				this.setState({
					songs: res.data["songs"],
				})
			);
	}

	render() {
		return (
			<div>
				<Tabs>
					<TabList>
						<Tab>Listen & Rate</Tab>
						<Tab>Your Ratings</Tab>
						<Tab>Social</Tab>
					</TabList>

					<TabPanel>
						{this.state.songs ? (
							<ListenRate
								songs={this.state.songs}
								username={this.props.username}
							/>
						) : (
							<div>
								Loading songs just for you <Spinner />
							</div>
						)}
					</TabPanel>
					<TabPanel>
						<YourRatings />
					</TabPanel>
					<TabPanel>
						<h2>Any content 3</h2>
					</TabPanel>
				</Tabs>
			</div>
		);
	}
}
