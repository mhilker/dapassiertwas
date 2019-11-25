// @flow

import React from 'react';
import './Timeline.scss';
import type { Event } from './Events';

const classNames = require('classnames');

type Range = {
  start: Date,
  end: Date,
};

type Brush = {
  start: ?Date,
  end: ?Date,
};

const viewBox = {
  minX: 0,
  minY: 0,
  width: 1000,
  height: 300,
};

type TimelineContainerProps = {
  events: Event[],
  range: Range,
  onChangeTimeRange: (range: Range) => void,
};

type TimelineContainerState = {
  brush: ?Brush,
};

export default class TimelineContainer extends React.Component<TimelineContainerProps, TimelineContainerState> {
  ref = React.createRef();

  state = {
    pressed: false,
    brush: null,
  };

  componentDidMount() {
    this.ref.current.addEventListener('mousemove', this.onMouseMove);
    this.ref.current.addEventListener('mousedown', this.onMouseDown);
    this.ref.current.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    this.ref.current.removeEventListener('mousemove', this.onMouseMove);
    this.ref.current.removeEventListener('mousedown', this.onMouseDown);
    this.ref.current.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e: SyntheticMouseEvent) => {
    const rect = this.ref.current.getBoundingClientRect();
    const percent = Math.max(e.clientX - rect.x, 0) / rect.width || 0;

    const time = this.props.range.start.getTime() + ((this.props.range.end.getTime() - this.props.range.start.getTime()) * percent);

    if (Number.isNaN(time) || !Number.isFinite(time)) {
      return;
    }

    const date = new Date(time);

    if (!this.state.pressed) {
      this.setState({
        brush: {
          start: date,
          end: null,
        },
      });
    } else {
      this.setState({
        brush: {
          start: this.state.brush.start,
          end: date,
        },
      });
    }
  };

  onMouseDown = () => {
    // when brush has end, remove it on next click
    if (this.state.brush && this.state.brush.end) {
      this.setState({
        brush: {
          start: this.state.brush.start,
          end: null,
        },
      });
    }

    // when brush has start, lock start on next click
    if (this.state.brush && this.state.brush.start) {
      this.setState({
        pressed: true,
      });
    }
  };

  onMouseUp = () => {
    this.setState({
      pressed: false,
    }, () => {
      const brush = this.normalizeBrush(this.state.brush);
      if (brush.start && brush.end) {
        this.props.onChangeTimeRange(brush);
      }
    });
  };

  render() {
    const brush = this.normalizeBrush(this.state.brush);

    return (
      <div ref={this.ref} className="timeline-container">
        <Timeline {...this.props} brush={brush}/>
      </div>
    );
  }

  normalizeBrush = (brush: Brush): Range => {
    if (brush && brush.start && brush.end && brush.start.getTime() > brush.end.getTime()) {
      return {
        start: this.state.brush.end,
        end: this.state.brush.start,
      };
    }

    return brush;
  }
}

type TimelineProps = {
  events: Event[],
  range: Range,
  brush: ?Brush,
};

function Timeline(props: TimelineProps) {
  return (
      <svg className="timeline" preserveAspectRatio="xMinYMin meet" viewBox={viewBox.minX + " " + viewBox.minY + " " + viewBox.width + " " + viewBox.height} >
        <TimelineAxis/>
        <TimelineBars count={7} range={props.range}/>

        {props.events.map(event => (
          <TimelineItem key={event.id} event={event} range={props.range}/>
        ))}

        <TimelineBrush range={props.range} brush={props.brush}/>
      </svg>
  );
}

function TimelineAxis() {
  return (
    <>
      <line x1="0" y1={viewBox.height * 0.90} x2={viewBox.width} y2={viewBox.height * 0.9} className="timeline-axis" />
      <line x1="0" y1="0" x2="0" y2={viewBox.height * 0.9} className="timeline-axis" />
    </>
  );
}

type TimelineBrushProps = {
  range: Range,
  brush: ?Brush,
};

function TimelineBrush(props: TimelineBrushProps) {
  if (!props.brush) {
    return [];
  }

  let start = 0;
  let end   = 0;

  if (props.brush.start) {
    start = 1 - (props.range.end.getTime() - props.brush.start.getTime()) / (props.range.end.getTime() - props.range.start.getTime());
  }

  if (props.brush.end) {
    end = 1 - (props.range.end.getTime() - props.brush.end.getTime()) / (props.range.end.getTime() - props.range.start.getTime());
  }

  return (
    <>
      {props.brush.start && props.brush.end && (
        <rect x={start * viewBox.width} y="0" width={end * viewBox.width - start * viewBox.width} height={viewBox.height * 0.9} className="timeline-brush"/>
      )}
      {props.brush.start && (
        <line x1={start * viewBox.width} y1="0" x2={start * viewBox.width} y2={viewBox.height * 0.9} className="timeline-brush-bar"/>
      )}
      {props.brush.end && (
        <line x1={end * viewBox.width} y1="0" x2={end * viewBox.width} y2={viewBox.height * 0.9} className="timeline-brush-bar"/>
      )}
    </>
  );
}

type TimelineItemProps = {
  event: Event,
  range: Range,
};

function TimelineItem(props: TimelineItemProps) {
  const classes = classNames({
    'timeline-item': true,
    'timeline-item--command': props.event.type === 'command',
    'timeline-item--event': props.event.type === 'event',
  });

  const range = (props.range.end.getTime() - props.range.start.getTime());
  const x     = (props.event.occurred.getTime() - props.range.start.getTime()) / range * viewBox.width;

  return (
      <rect x={x} y="0" width="1rem" height={viewBox.height * 0.9} className={classes}/>
  );
}

type TimelineBarsProps = {
  count: number,
  range: Range,
};

function TimelineBars(props: TimelineBarsProps) {
  const width = viewBox.width / props.count;

  const bars = Array.from(Array(props.count).keys());
  bars.shift();

  const range = (props.range.end.getTime() - props.range.start.getTime());
  const start = props.range.start.getTime();

  return (
    <g className="timeline-bar">
      {bars.map(bar => {
        const date = new Date(bar / props.count * range + start);
        return (
          <React.Fragment key={bar}>
            <line x1={bar * width} y1={viewBox.height * 0.9} x2={bar * width} y2={viewBox.height * 0.95} className="timeline-bar" />
            <text transform="translate(-30)" x={bar * width} y={viewBox.height} className="timeline-bar-text">
              {date.getHours().toString().padStart(2, '0')}:
              {date.getMinutes().toString().padStart(2, '0')}:
              {date.getSeconds().toString().padStart(2, '0')}
            </text>
          </React.Fragment>
        );
      })}
    </g>
  );
}