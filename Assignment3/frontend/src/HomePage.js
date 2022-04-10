import React from "react";
import "react-tabs/style/react-tabs.css";
import YourRatings from "./YourRatings";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
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
