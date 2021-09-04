import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import Footer from "./Footer";
import RenderPlants from "./RenderPlants";
import Welcome from "./Welcome";
import Help from "./Help";

const App = () => {

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [pass, setPass] = useState("");

  const changeSuccess = (newPass) => {
    setPass(newPass);
    setSuccess(true);
    setErrMsg("");
  }

  const changeError = () => {
    setErrMsg("Incorrect username/password, or that user already exists. Please ensure all fields are correct and try again.");
  }

  return (
    <div className="root-div">

      <BrowserRouter>
        <Switch>

          <Route path="/help">
            <Help />
          </Route>

          {localStorage.getItem('loggedIn') && <Route path={`/${localStorage.getItem('loggedInUser')}`}>
            <RenderPlants login={true} userPass={pass} loggedUser={localStorage.getItem('loggedInUser')}/>
          </Route>}
          
          <Route path="/:username">
            {success ? <RenderPlants login={false} userPass={pass} /> : <Welcome errMsg={errMsg} submitSuccess={changeSuccess} submitError={changeError} />}
          </Route>

          <Route path="/">
            <Welcome errMsg={errMsg} submitSuccess={changeSuccess} submitError={changeError} />
          </Route>

        </Switch>
      </BrowserRouter>
      
      <Footer />
    </div>
  );
}

export default App;
