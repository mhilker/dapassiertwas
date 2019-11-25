// @flow

import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import { events } from "./Events";
import Filter from "./Filter";
import Timeline from "./Timeline";
import List from "./List";

export default function Dashboard () {
  const history = useHistory();
  function onChangeTimeRange (range: Range) {
    history.push({
      pathname: `/${range.start.toISOString()}/${range.end.toISOString()}`,
    });
  }

  const { start, end } = useParams();
  const range = {
    start: new Date(Date.parse(start)),
    end: new Date(Date.parse(end)),
  };

  const filteredEvents = events.filter((event) => event.occurred >= range.start && event.occurred <= range.end);

  return (
    <DashboardPage
      events={filteredEvents}
      range={range}
      onChangeTimeRange={onChangeTimeRange}
    />
  );
}

type DashboardPageProps = {
  onChangeTimeRange: (range: Range) => void,
  events: Event[],
  range: Range,
};

function DashboardPage(props: DashboardPageProps) {
  return (
    <>
      <Filter/>
      <Timeline
        events={props.events}
        range={props.range}
        onChangeTimeRange={props.onChangeTimeRange}
      />
      <List
        events={props.events}
      />
    </>
  );
}
