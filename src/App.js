import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//firebase
import "firebase/analytics";

//Components
import NotificationDialog from "./NotificationDialog";
import Cards from "./Cards";

function App() {
  return (
    <div className="App">
      <NotificationDialog />
      <Router>
        <Switch>
          {/* <Route path="/card/:auth/:id">
            <Header />
            <DynamicCards />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route> */}
          <Route path="/">
            {/* <Header /> */}
            <Cards />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
