import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import { SignUpLink } from "./signup";

const SignInPage = () => (
  <div>
    Log In
    <SignIn />
    <SignUpLink />
  </div>
);

const userDetails = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  state = {
    ...userDetails,
    token: (sessionStorage.token && JSON.parse(sessionStorage.token)) || ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post("/users/signin", {
        email,
        password
      })
      .then(res => {
        const { token } = res.data
        sessionStorage["token"] = JSON.stringify(token)
        this.setState({ ...userDetails , token: token});
        this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <Paper elevation={8}>
        <TextField
          required
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChange={this.handleChange}
          style={{ margin: 10 }}
        />
        <TextField
          required
          name="password"
          label="Password"
          type="password"
          placeholder="Enter a strong password"
          value={password}
          onChange={this.handleChange}
          style={{ margin: 10 }}
        />
        <Button style={{ margin: 15 }} onClick={this.handleSubmit}>
          Log In
        </Button>
        <div>{error && <div>{error.message}</div>}</div>
      </Paper>
    );
  }
}

const SignIn = withRouter(SignInForm);

export default SignInPage;

export { SignIn };
