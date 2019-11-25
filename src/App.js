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
          <Redirect to="/2019-09-10T11:59:55.000Z/2019-09-10T12:00:10.000Z"/>
        </Route>
        <Route path="/:start/:end">
          <Dashboard/>
        </Route>
      </Switch>
    </Router>
  );
}
