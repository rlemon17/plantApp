import React from "react";
import { Link } from "react-router-dom";

const _ = require('lodash');

const Header = (props) => {
  return (
    <header>
      <h1>{props.welcomeMode ? `Lemon's Plant Care App` : `${_.capitalize(props.user)}'s Houseplants`}</h1>
      <div id="links">
         <Link to="/" id="home">Home</Link>
         <Link to="/help" id="help">Help</Link>
      </div>
    </header>
  );
}

export default Header;
