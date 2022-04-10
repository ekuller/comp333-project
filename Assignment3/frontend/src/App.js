import React, { Component } from "react";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { ReactSession } from "react-client-session";
import { v4 as uuidv4 } from "uuid";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getSessionID();
    this.state = {
      sessionID: ReactSession.get("sessionID"),
      authenticated: false,
    };
  }

  getSessionID() {
    ReactSession.setStoreType("localStorage");
    if (ReactSession.get("sessionID") === undefined) {
      ReactSession.set("sessionID", uuidv4());
    }
  }

  componentDidMount() {
    this.checkAuthenticate();
  }

  checkAuthenticate() {
    console.log("Current sessionID:", ReactSession.get("sessionID"));
    fetch(
      "http://127.0.0.1:8000/rater/is-authenticated/" +
        ReactSession.get("sessionID")
    )
      .then((response) => response.json())
      .then((login) => {
        if (login.status === "is_authenticated") {
          this.setState({ authenticated: login.display_name });
        } else {
          return true;
        }
      });
  }

  handleLogout = () => {
    let new_window = window.open("https://www.spotify.com/logout/");
    setTimeout(function () {
      new_window.close();
    }, 1000);
    ReactSession.remove("sessionID");
    this.getSessionID();
    this.setState({
      sessionID: ReactSession.get("sessionID"),
      authenticated: false,
    });
  };

  render() {
    return (
      <div>
        <p>Session ID is: {this.state.sessionID}</p>
        <LoginPage
          loginStatus={this.state.authenticated}
          handleLogout={this.handleLogout}
          sessionID={this.state.sessionID}
        ></LoginPage>
        <HomePage />
      </div>
    );
  }
}
