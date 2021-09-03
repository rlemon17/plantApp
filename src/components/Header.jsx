import React from "react";

const _ = require('lodash');

const Header = (props) => {
  return (
    <header>
      <h1>{_.capitalize(props.user)}'s Houseplants</h1>
    </header>
  );
}

export default Header;
