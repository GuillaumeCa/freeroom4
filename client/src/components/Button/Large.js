import React, { Component } from 'react';
import './Large.css';

function LargeButton({ onClick, label }) {
  return (
    <div onClick={onClick} className="LargeButton">
      {label}
    </div>
  );
}

export default LargeButton;
