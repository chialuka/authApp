import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const SignUpPage = () => (
  <div>
    <SignUp />
  </div>
);

const userDetails = {
  name: "",
  email: "",
  password: "",
  password2: "",
  error: null
};

class SignUpForm extends Component {
  state = {
    ...userDetails,
  };

  componentDidMount() {
    if (this.state.token) {
      this.props.history.push("/home");
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    axios
      .post("/users/signup", {
        name,
        email,
        password,
        password2
      })
      .then(user => {
        const { token } = user.data;
        this.props.setToken(token);
        this.setState({ ...userDetails });
        this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
  };

  render() {
    const { name, email, password, password2, error } = this.state;
    return (
      <div>
        <div>Sign Up</div>
        <Paper elevation={8}>
          <TextField
            required
            name="name"
            label="name"
            placeholder="Enter your full name"
            value={name}
            onChange={this.handleChange}
            style={{ margin: 10 }}
          />
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
          <TextField
            required
            name="password2"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={password2}
            onChange={this.handleChange}
            style={{ margin: 10 }}
          />
          <Button
            variant="contained"
            style={{ margin: 15 }}
            onClick={this.handleSubmit}
          >
            Create Account
          </Button>
          <div>{error && <p>{error.message}</p>}</div>
        </Paper>
      </div>
    );
  }
}

const SignUpLink = () => (
  <div>
    Don't have an account?<Link to="/signup">Sign up here</Link>
  </div>
);

const SignUp = withRouter(SignUpForm);

export default SignUpPage;

export { SignUpLink, SignUp };
