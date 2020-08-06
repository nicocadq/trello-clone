import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../../pages/HomePage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
