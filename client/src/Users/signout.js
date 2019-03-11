import React from "react";
import Button from "@material-ui/core/Button";

const SignOut = () => {
  const logOut = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/"
  };
  return <Button onClick={logOut}>Sign Out</Button>;
};


export default SignOut;
