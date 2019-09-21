// @flow

import React from 'react';
import './List.css';
import type { Event } from './Events';

type ListProps = {
  events: Event[],
};

export default function List(props: ListProps) {
  return (
    <React.Fragment>
      {props.events.map(event => (
        <ListItem key={event.id} event={event}/>
      ))}
    </React.Fragment>
  );
}

type ListItemProps = {
  event: Event,
};

function ListItem(props: ListItemProps) {
  return (
    <div className="list-item">
      <code>{props.event.id}</code>
      <code>{props.event.topic}</code>
      <code className="list-detail">
        {JSON.stringify(props.event, null, 4)}
      </code>
    </div>
  );
}
