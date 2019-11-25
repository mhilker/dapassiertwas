// @flow

import React from 'react';
import { Link } from "react-router-dom";
import TimeSelect from "./TimeSelect";
import './Layout.scss';

export function Header() {
    return (
      <header className="header">
        <b className="header-title">Da Passiert Was</b>
        <nav className="navigation">
          <Link className="navigation-item" to="/">Dashboard</Link>
          <Link className="navigation-item" to="/settings">Settings</Link>
        </nav>
        <TimeSelect/>
      </header>
    );
}
