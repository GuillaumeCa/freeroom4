import React, { Component } from 'react';

class Large extends Component {
  render() {
    const props = this.props
    return (
      <div onClick={props.onClick}>
        {props.label}
      </div>
    );
  }
}

export default Large;
