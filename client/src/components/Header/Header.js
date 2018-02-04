import React, { Component } from 'react';
import './Header.css';
import Translate from '../Translate';

class Header extends Component {

  render() {
    return (
      <div>
        <h1 className="Header-title">FreeRoom</h1>
        <h2 className="Header-subtitle"><Translate t="header.subtitle" /></h2>
      </div>
    );
  }
}

export default Header;
