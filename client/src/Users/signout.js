import React from "react";
import Button from "@material-ui/core/Button";

// const SignOut = () => {
//   const logOut = () => {
//     sessionStorage.removeItem("token");
//   };
//   return <Button onClick={logOut}>Sign Out</Button>;
// };

class SignOut extends React.Component {
  state = {
    token: (sessionStorage.token && JSON.parse(sessionStorage.token)) || ""
  }

  logOut = () => {
    sessionStorage.removeItem("token");
    this.setState({ token: ""})
  }

  render() {
    return(
      <Button onClick={this.logOut}>Sign Out</Button>
    )
  }
}

export default SignOut;
