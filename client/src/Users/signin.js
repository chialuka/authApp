import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withRouter, Link } from "react-router-dom";
import { SignUpLink } from "./signup";

const SignInPage = props => (
  <div>
    <SignIn setToken={props.setToken} />
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
    if (localStorage.token) {
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
        // const { token } = res.data;
        // this.props.setToken(token);
        this.setState({ ...userDetails });
        //this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div>
        <Paper elevation={3} className="paper">
          Log In
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
          <Button
            variant="contained"
            style={{ margin: 15 }}
            onClick={this.handleSubmit}
          >
            Log In
          </Button>
          <div>{error && <div>{error.message}</div>}</div>
          <a
            href="http://localhost:7000/api/auth/google"
            className="googleSignIn"
          >
            Sign in With Google?
          </a>
          <SignUpLink />
        </Paper>
      </div>
    );
  }
}

const SignInLink = () => (
  <div className="signInLink">
    Have an account? <Link to="/signin">Login</Link>
  </div>
);

const SignIn = withRouter(SignInForm);

export default SignInPage;

export { SignIn, SignInLink };
