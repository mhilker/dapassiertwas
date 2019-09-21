// @flow

import React from 'react';
import './App.css';
import Timeline from './Timeline';
import { events } from './Events';
import List from './List';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import type {Match, RouterHistory} from "react-router-dom";

export default function AppRouter() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={RedirectWithTimeRange} />
      <Route path="/:start/:end" exact component={App} />
    </Router>
  );
}

function RedirectWithTimeRange() {
  return (
    <Redirect to="/2019-09-10T13:59:55/2019-09-10T14:00:10"/>
  );
}

type AppProps = {
  match: Match,
  history: RouterHistory,
};

type AppState = {
};

class App extends React.Component<AppProps, AppState> {
  onChangeTimeRange = (range: Range) => {
    this.setState({
      range: range,
    });

    this.props.history.push({
      pathname: `/${range.start.toISOString()}/${range.end.toISOString()}`,
    })
  };

  render() {
    const range = {
      start: new Date(Date.parse(this.props.match.params.start)),
      end: new Date(Date.parse(this.props.match.params.end)),
    };
    const filteredEvents = events.filter((event) => event.occurred >= range.start && event.occurred <= range.end);

    return (
      <Page
        events={filteredEvents}
        range={range}
        onChangeTimeRange={this.onChangeTimeRange}
      />
    );
  }
}

type PageProps = {
  onChangeTimeRange: (range: Range) => void,
  events: Event[],
  range: Range,
};

function Page(props: PageProps) {
  return (
    <React.Fragment>
      <Timeline
        events={props.events}
        range={props.range}
        onChangeTimeRange={props.onChangeTimeRange}
      />
      <List
        events={props.events}
      />
    </React.Fragment>
  );
}
