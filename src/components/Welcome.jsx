import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "./Header";
import axios from 'axios';

const _ = require('lodash');
const md5 = require('md5');

const Welcome = (props) => {

  let {username} = useParams();

  if (!username) {
    username = "";
  }

  const [user, setUser] = useState({
    username: username,
    password: ""
  });

  // Handling change in input value
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  // Allows editing URL link
  const history = useHistory();

  const handleRegister = (event) => {

    // First, check if this user already exists
    let userExist = false;

    // Update from database by grabbing user
    axios.get(`https://arcane-ravine-23754.herokuapp.com/users`)
      .then(usersArray => {

        // Find specific user
        for (let i = 0; i < usersArray.data.length; i++) {
          if (usersArray.data[i].name === user.username) {
            userExist = true;
          }
        }

        if (userExist || user.username === "" || user.password === "") {
          props.submitError();
        }

        else {
          props.submitSuccess(md5(user.password));
          history.push(_.toLower(user.username));
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('loggedInUser', user.username);
        }
      })

    event.preventDefault();
  }

  const handleLogin = (event) => {

    // First, check if this user even exists
    let userDNE = true;

    // Update from database by grabbing user
    axios.get(`https://arcane-ravine-23754.herokuapp.com/users`)
      .then(usersArray => {

        // Find specific user
        for (let i = 0; i < usersArray.data.length; i++) {

          // If found, set to false for now
          if (usersArray.data[i].name === user.username) {
            userDNE = false;
            
            // Now check their password
            if (usersArray.data[i].password === md5(user.password)) {
              props.submitSuccess(md5(user.password));
              history.push(_.toLower(user.username));
              localStorage.setItem('loggedIn', true);
              localStorage.setItem('loggedInUser', user.username);
            }

            // Otherwise, set back to true for error
            else {
              userDNE = true;
            }

          }
        }

        if (userDNE || user.username === "" || user.password === "") {
          props.submitError();
        }
      })
    
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

              {/* Needed to edit so you can't access other accounts or log in again if already logged in */}
              {localStorage.getItem('loggedIn') ? <div>
                <p>Seems like you're already logged in!</p>
                <p>Click on "Plants" to see your interface, or "Logout" to safely exit.</p>
              </div> : <div>
                <p>To get started, please login or register here.</p>
                <p id="welcome-error">{props.errMsg}</p>
                <div className="container">
                  <label>Username:
                    <input
                    required
                    autoComplete="off"
                    name="username"
                    onChange={handleChange}
                    value={user.username}
                    />
                  </label>
                </div>

                <div className="container">
                  <label>Password:
                    <input
                    required
                    type="password"
                    autoComplete="off"
                    name="password"
                    onChange={handleChange}
                    value={user.password}
                    />
                  </label>
                </div>

                <button id="username-btn2" onClick={handleLogin}>
                  Login
                </button>

                <button id="username-btn" onClick={handleRegister}>
                  Register
                </button>
              </div>}
              
            </form>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default Welcome;
