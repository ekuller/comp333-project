import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import classnames from "classnames";

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
		};
	}

	render() {
		return (
			<div>
				Welcome
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
						<h2>Any content 2</h2>
					</TabPanel>
					<TabPanel>
						<h2>Any content 3</h2>
					</TabPanel>
				</Tabs>
			</div>
		);
	}
}
