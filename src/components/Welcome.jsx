import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

const _ = require('lodash');

const Welcome = () => {
  const [value, setValue] = useState("");

  // Handling change in input value
  const handleChange = (event) => {
    setValue(event.target.value);
  }

  // Allows editing URL link
  const history = useHistory();

  const handleClick = (event) => {
    history.push(_.toLower(value));
    event.preventDefault();
  }

  return (
    <div>
      <Header welcomeMode={true}/>

      <div id="login" className="container">
        <div className="row">

          <div className="col-md">
            <div id="pixel">
              <img src="../Plant.gif" alt="ryan-and-meelo"/>
            </div>
          </div>

          <div className="col-md">
            <form className="create-plant username-select">
              <h2>Welcome!</h2>
              <p>Enter your name or username here.</p>
              <p>You can also append "/username" to the URL and refresh!</p>
              <div className="container">
                <input
                autoComplete="off"
                name="username"
                onChange={handleChange}
                value={value}
                />
              </div>
              <button id="username-btn" onClick={handleClick}>
                Go!
              </button>
            </form>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default Welcome;
