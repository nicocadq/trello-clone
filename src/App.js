import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Board from "./components/Board";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/board/:id">
          <Board />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
