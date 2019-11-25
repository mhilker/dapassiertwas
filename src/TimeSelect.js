// @flow

import React, { useState } from 'react';
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import Datetime from 'react-datetime';
import './TimeSelect.scss';
import 'react-datetime/css/react-datetime.css';

export default function TimeSelect() {
  const [open, setOpen] = useState(false);
  function toggle () {
    setOpen(!open);
  }

  const { start, end } = useParams();

  return (
    <>
      <button onClick={toggle}>edit time range</button>
      {open && (
        <TimeSelectModal start={new Date(Date.parse(start))} end={new Date(Date.parse(end))}/>
      )}
    </>
  );
}

type TimeSelectModalProps = {
  start: Date,
  end: Date,
};

function TimeSelectModal(props: TimeSelectModalProps) {
  const [range, setRange] = useState({
    start: props.start,
    end: props.end,
  });
  function onChangeRange(date, name) {
    if (typeof date === 'object') {
      setRange({
        ...range,
        [name]: new Date(Date.parse(date.toISOString()))
      })
    }
  }

  return (
    <Modal>
      <div className="modal">
        <div className="modal-head">Select Time Range</div>
        <div className="modal-body">
          <form className="time-select">
            <Datetime
              className="time-start"
              name="start"
              value={range.start.toISOString()}
              onChange={date => onChangeRange(date, 'start')}
              open={true}
            />
            <Datetime
              className="time-start"
              name="end"
              value={range.end.toISOString()}
              onChange={date => onChangeRange(date, 'end')}
              open={true}
            />
          </form>
        </div>
      </div>
    </Modal>
  );
}
