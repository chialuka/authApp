import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from './Routes/router';
import LandingPage from "./Users/landing";
import HomePage from "./Users/home";
import SignInPage from "./Users/signin";
import SignUpPage from "./Users/signup"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Routes />
            <hr />
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
