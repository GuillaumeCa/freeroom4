import React, { Component } from 'react';

export default function Floor({ floor, children }) {
  let floorName = floor;
  if (Number(floor) === 0) floorName = 'RDC';
  if (Number(floor) === 1) floorName = '1er';
  if (Number(floor) > 1) floorName += 'e';
  return (
    <div className="RoomsList-floor">
      <h3 className="RoomsList-floor-name secondary-color">{floorName}</h3>
      {children}
    </div>
  )
}
