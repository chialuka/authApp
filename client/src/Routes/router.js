import React from "react";
import { Link } from "react-router-dom";
import SignOut from "../Users/signout";

const Routes = ({ token }) => (
  <div>{token.length ? <RouterAuth token={token} /> : <RouterNonAuth />}</div>
);

const RouterAuth = token => (
  <div className="routes">
    <div className="link">
      <Link to="/">Front Page</Link>
    </div>
    <div className="link">
      <Link to="/home">Home</Link>
    </div>
    <div className="link">
      <SignOut token={token} />
    </div>
  </div>
);

const RouterNonAuth = () => (
  <div className="routes">
    <div className="link">
      <Link to="/">Front Page</Link>
    </div>
    <div className="link">
      <Link to="/signup">Sign Up</Link>
    </div>
    <div className="link">
      <Link to="/signin">Sign In</Link>
    </div>
  </div>
);

export default Routes;
