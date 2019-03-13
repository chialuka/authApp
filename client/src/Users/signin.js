import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import { SignUpLink } from "./signup";

const SignInPage = props => (
  <div>
    Log In
    <SignIn setToken={props.setToken} />
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
    ...userDetails
  };

  componentDidMount() {
    if (sessionStorage.token) {
      this.props.history.push("/home");
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post("/api/signin", {
        email,
        password
      })
      .then(res => {
        const { token } = res.data;
        this.props.setToken(token);
        this.setState({ ...userDetails });
        this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
  };

  signInWithGoogle = e => {
    e.preventDefault();
    //window.location.href = "/api/auth/google";
    axios
      .get("/api/auth/google")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div>
        <Paper elevation={3}>
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
        <div>
          Have a Google account?
          <Button onClick={this.signInWithGoogle}>Sign in</Button>
        </div>
      </div>
    );
  }
}

const SignIn = withRouter(SignInForm);

export default SignInPage;

export { SignIn };
