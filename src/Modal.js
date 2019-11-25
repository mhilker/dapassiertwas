// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

type Props = {}

type State = {}

const modalRoot = document.getElementById('modal');

export default class Modal extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.element = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.element);
  }

  render() {
    return ReactDOM.createPortal(
      (
        <div className="modal-background">
          {this.props.children}
        </div>
      ),
      this.element,
    );
  }
}
