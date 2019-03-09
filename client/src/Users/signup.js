import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const SignUp = () => (
  <div>
    Sign Up
    <SignUpForm />
  </div>
)

const userDetails = {
  name: "",
  email: "",
  password: "",
  password2: ""
};

class Form extends Component {
  state = {
    ...userDetails
  };

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
    .then(() => {
      this.setState({ ...userDetails });
      this.props.history.push("/home")
    })
  };

  render() {
    const { name, email, password, password2 } = this.state;
    return (
      <form>
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
        <Button onSubmit={this.handleSubmit} style={{ margin: 15 }}>
          Create Account
        </Button>
      </form>
    );
  }
}

const SignUpLink = () => (
  <div>Don't have an account?<Link to="/signup">Sign up here</Link></div>
)

const SignUpForm = withRouter(Form)

export default SignUp;

export { SignUpLink, SignUpForm }
