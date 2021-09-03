import React from "react";
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import Footer from "./Footer";
import RenderPlants from "./RenderPlants";
import Welcome from "./Welcome";
import Help from "./Help";

const App = () => {

  return (
    <div className="root-div">

      <BrowserRouter>
        <Switch>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/:username">
            <RenderPlants />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </BrowserRouter>
      
      <Footer />
    </div>
  );
}

export default App;
