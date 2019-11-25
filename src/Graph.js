import React from 'react';
import './Graph.scss';

const classNames = require('classnames');

const viewBox = {
  minX: 0,
  minY: 0,
  width: 1000,
  height: 300,
};

export default function Graph(props) {
  const nodes = convert(props.events);
  return (
    <div className="graph-container">
      <svg className="graph" preserveAspectRatio="xMinYMin meet" viewBox={viewBox.minX + " " + viewBox.minY + " " + viewBox.width + " " + viewBox.height}>
        {nodes.map(node => (
          <GraphNode key={node.event.id} node={node}/>
        ))}
      </svg>
    </div>
  );
}

type Node = {
  event: Event,
  children: Node[],
};

function convert(events: Event[]): Node[] {
  const nodes = {};

  events.map((event) => {
    nodes[event.id] = {
      event: event,
      children: [],
    };
    return event;
  });
  events.map((event) => {
    if (event.causationId !== event.id) {
      nodes[event.causationId].children.push(event.id);
    }
    return event;
  });

  return Array.from(Object.values(nodes));
}

type GraphNodeProps = {
  node: Node,
};

function GraphNode(props: GraphNodeProps) {
  const classes = classNames({
    'graph-node': true,
    'graph-node--command': props.node.event.type === 'command',
    'graph-node--event': props.node.event.type === 'event',
  });

  return (
    <rect x="0" y="0" width="100" height="100" className={classes}/>
  );
}
