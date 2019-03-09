import React from "react";
import { Link } from "react-router-dom";

const Routes = () => (
  <div>
    <ul>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        <Link to="/signin">SignIn</Link>
      </li>
      <li>
        <Link to="/">Front Page</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
      </li>
    </ul>
  </div>
);

export default Routes;
