// @flow

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Header } from "./Layout";
import './App.scss';

export default function App() {
  return (
    <Router>
      <Route path="/:start/:end">
        <Header/>
      </Route>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/2020-01-01T00:00:00.000Z/2020-12-31T23:59:59.999Z"/>
        </Route>
        <Route path="/:start/:end">
          <Dashboard/>
        </Route>
      </Switch>
    </Router>
  );
}
