import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";
import YourRatings from "./YourRatings";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classnames from "classnames";

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
		};
		this.getUser();
	}

	getUser() {
		fetch("http://127.0.0.1:8000/rater/get-user").then((response) =>
			console.log(response.json())
		);
	}

	render() {
		return (
			<div>
				Welcome {this.user}
				<Tabs>
					<TabList>
						<Tab>Listen & Rate</Tab>
						<Tab>Your Ratings</Tab>
						<Tab>Social</Tab>
					</TabList>

					<TabPanel>
						<h2>Any content 1</h2>
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
