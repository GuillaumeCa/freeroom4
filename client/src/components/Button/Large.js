import React, { Component } from 'react';
import './Large.css';

class Large extends Component {
  render() {
    const props = this.props
    return (
      <div onClick={props.onClick} className="LargeButton">
        {props.label}
      </div>
    );
  }
}

export default Large;
