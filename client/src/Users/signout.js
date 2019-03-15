import React from "react";
import jwt_decode from "jwt-decode";

const SignOut = ({ token }) => {
  let decodedToken;
  decodedToken = jwt_decode(token.token);

  const currentTime = Date.now() / 1000;
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  if (decodedToken.exp < currentTime) return logOut();
  return <div onClick={logOut} className="signOut">Sign Out</div>;
};

export default SignOut;
