import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "./Routes/router";
import LandingPage from "./Users/landing";
import HomePage from "./Users/home";
import SignInPage from "./Users/signin";
import { SignUp } from "./Users/signup";

class App extends Component {
  state = {
    token: (sessionStorage.token && JSON.parse(sessionStorage.token)) || ""
  };


  setToken = token => {
    this.setState({ token });
    sessionStorage.token = JSON.stringify(token);
  };

  render() {
    console.log(this.state.token)
    return (
      <div className="App">
        <Router>
          <div>
            <Routes token={this.state.token}/>
            <hr />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={HomePage} />
            <Route
              path="/signin"
              render={props => (
                <SignInPage {...props} setToken={this.setToken} />
              )}
            />
            <Route
              path="/signup"
              render={props => <SignUp {...props} setToken={this.setToken} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
