import React from "react";
import "react-tabs/style/react-tabs.css";
import ListenRate from "./ListenRate";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { Spinner, Button } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Modal from "./Modal2";

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getTopSongs();
		this.modal = false;
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
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};

	addRating(song, rating) {
		return axios.post("http://127.0.0.1:8000/rater/rate/", {
			song: song,
			rating: rating,
			username: this.props.username,
		});
	}

	handleSubmit = (song, rating, artist) => {
		this.toggle();
		axios.get("http://127.0.0.1:8000/rater/song").then((res) => {
			for (let i in res) {
				if (i.song === song) {
					this.addRating(song, rating);
					return;
				}
			}
			axios
				.post("http://127.0.0.1:8000/rater/song", {
					song: song,
					artist: artist,
				})
				.then(() => this.addRating(song, rating));
		});
	};

	rateOtherSong() {
		this.setState({
			modal: !this.state.modal,
		});
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
						<Button onClick={() => this.rateOtherSong()}>
							Rate Other Song
						</Button>
						{this.state.songs ? (
							<ListenRate
								songs={this.state.songs}
								username={this.props.username}
								yourRatings={false}
							/>
						) : (
							<div>
								Loading songs just for you <Spinner />
							</div>
						)}
					</TabPanel>
					<TabPanel>
						<ListenRate username={this.props.username} yourRatings={true} />
					</TabPanel>
					<TabPanel>
						<ListenRate
							username={this.props.username}
							yourRatings={false}
							social={true}
						/>
					</TabPanel>
				</Tabs>
				{this.state.modal ? (
					<Modal toggle={this.toggle} onSave={this.handleSubmit} />
				) : null}
			</div>
		);
	}
}
