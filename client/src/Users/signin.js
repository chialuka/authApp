import React, { Component } from "react";
import axios from "axios"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom"
import { SignUpLink } from "./signup";


const SignIn = () => (
  <div>
    Log In
    <SignUpLink />
    <SignInForm />
  </div>
)

const userDetails = {
  email: "",
  password: "",
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
    const { email, password } = this.state;
    axios
    .post("/users/signin", {
      email,
      password
    })
    .then(() => {
      this.setState({ ...userDetails })
      this.props.history.push("/home")
    })
  };

  render() {
    const { email, password } = this.state;
    return (
      <form>
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
        <Button onSubmit={this.handleSubmit} style={{ margin: 15 }}>
          Log In
        </Button>
      </form>
    );
  }
}

const SignInForm = withRouter(Form)

export default SignIn;

export { SignInForm }
