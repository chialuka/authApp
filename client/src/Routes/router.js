import React from "react";
import { Link } from "react-router-dom";
import SignOut from "../Users/signout";

const Routes = ({ token }) => (
  <div>{token.length > 0 ? <RouterAuth /> : <RouterNonAuth />}</div>
);

const RouterAuth = () => (
  <ul>
    <li>
      <Link to="/">Front Page</Link>
    </li>
    <li>
      <Link to="/home">Home</Link>
    </li>
    <SignOut />
  </ul>
);

const RouterNonAuth = () => (
  <ul>
    <li>
      <Link to="/">Front Page</Link>
    </li>
    <li>
      <Link to="/signup">Sign Up</Link>
    </li>
    <li>
      <Link to="/signin">Login</Link>
    </li>
  </ul>
);


export default Routes;
