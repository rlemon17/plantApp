import React from "react";
import { Link } from "react-router-dom";

const _ = require('lodash');

const handleClick = () => {
  localStorage.clear();
}

const Header = (props) => {
  return (
    <header>
      <h1>{props.welcomeMode ? `Lemon's Plant Care App` : `${_.capitalize(props.user)}'s Houseplants`}</h1>
      <div id="links">
        <Link to={localStorage.getItem('loggedIn') ? `/${localStorage.getItem('loggedInUser')}` : "/"} id="myPlants">Plants</Link>
        <Link to="/help" id="help">Help</Link>
        <Link onClick={handleClick} to="/" id="home">{localStorage.getItem('loggedIn') ? "Logout" : "Home"}</Link>
      </div>
    </header>
  );
}

export default Header;
