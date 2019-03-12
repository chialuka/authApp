import React from "react";
import Button from "@material-ui/core/Button";
import jwt_decode from "jwt-decode";

const SignOut = ({ token }) => {
  let decodedToken;
  decodedToken = jwt_decode(token.token);

  const currentTime = Date.now() / 1000;
  const logOut = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };
  console.log(decodedToken.exp, currentTime, decodedToken.exp - currentTime);
  if (decodedToken.exp < currentTime) return logOut();
  return <Button onClick={logOut}>Sign Out</Button>;
};

export default SignOut;
