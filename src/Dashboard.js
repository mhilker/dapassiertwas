// @flow

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { events } from "./Events";
import Filter from "./Filter";
import Timeline from "./Timeline";
import List from "./List";
import {loadBuckets, loadHistory} from './API';
import type {Bucket} from "./API";

export default function Dashboard () {
  const history = useHistory();
  function onChangeTimeRange (range: Range) {
    history.push({
      pathname: `/${range.start.toISOString()}/${range.end.toISOString()}`,
    });
  }

  const [events, setEvents] = useState(null);
  useEffect(() => {
    async function doLoadHistory(status) {
      const result = await loadHistory({});
      const filteredEvents = result.events.filter((event) => event.occurred >= range.start && event.occurred <= range.end);
      setEvents(filteredEvents);
    }
    if (events === null) {
      doLoadHistory();
    }
  }, [events]);

  const [buckets, setBuckets] = useState(null);
  useEffect(() => {
    async function doLoadBuckets(status) {
      const result = await loadBuckets({});
      setBuckets(result.buckets);
    }
    if (buckets === null) {
      doLoadBuckets();
    }
  }, [buckets]);

  const { start, end } = useParams();
  const range = {
    start: new Date(Date.parse(start)),
    end: new Date(Date.parse(end)),
  };

  if (events === null || buckets === null) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <DashboardPage
      events={events}
      buckets={buckets}
      range={range}
      onChangeTimeRange={onChangeTimeRange}
    />
  );
}

type DashboardPageProps = {
  onChangeTimeRange: (range: Range) => void,
  events: Event[],
  buckets: Bucket[],
  range: Range,
};

function DashboardPage(props: DashboardPageProps) {
  return (
    <>
      <Filter/>
      <Timeline
        buckets={props.buckets}
        range={props.range}
        onChangeTimeRange={props.onChangeTimeRange}
      />
      <List
        events={props.events}
      />
    </>
  );
}
