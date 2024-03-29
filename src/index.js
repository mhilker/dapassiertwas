// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');
if (root) {
  ReactDOM.render(<App />, root);
}
serviceWorker.unregister();
