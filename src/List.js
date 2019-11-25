// @flow

import React, { useState } from 'react';
import './List.scss';
import type { Event } from './Events';

const classNames = require('classnames');

type ListProps = {
  events: Event[],
};

export default function List(props: ListProps) {
  return (
    <div className="list-container">
      <table className="list">
        <thead>
          <tr className="list-head-row">
            <th className="list-head-cell">&nbsp;</th>
            <th className="list-head-cell">Date</th>
            <th className="list-head-cell">ID</th>
            <th className="list-head-cell">Topic</th>
          </tr>
        </thead>
        <tbody>
          {props.events.map(event => (
            <ListItem key={event.id} event={event}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ListItemProps = {
  event: Event,
};

function ListItem(props: ListItemProps) {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  const classes = classNames({
    'list-row': true,
    'list-row-payload': true,
    'list-row-payload--visible': open,
  });

  return (
    <>
      <tr className="list-row">
        <td className="list-row-cell">
          <button onClick={toggle}>x</button>
        </td>
        <td className="list-row-cell">
          {props.event.occurred.toLocaleDateString()} {props.event.occurred.toLocaleTimeString()}
        </td>
        <td className="list-row-cell">
          {props.event.id}
        </td>
        <td className="list-row-cell">
          {props.event.topic}
        </td>
      </tr>
      <tr className={classes}>
        <td className="list-row-cell" colSpan={4}>
          <code>{JSON.stringify(props.event, null, 4)}</code>
        </td>
      </tr>
    </>
  );
}
