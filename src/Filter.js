// @flow

import React, {Component} from 'react';
import './Filter.scss';

type Props = {}

type State = {}

export default class Filter extends Component<Props, State> {
  render() {
    return (
      <div className="filter-container">
        <form className="filter">
          <input className="filter-input" type="text"/>
        </form>
      </div>
    )
  }
}
