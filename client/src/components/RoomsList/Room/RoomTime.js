import React, { Component } from 'react';
import moment from 'moment';

export default function RoomTime({ time }) {
  const now = new Date();
  const diff = time - now.getTime();
  let timeF = moment(diff)
    .add(1, 'm')
    .format('H[h]mm');
  if (diff / (1000 * 60 * 60) < 1) {
    timeF = moment(diff)
      .add(1, 'm')
      .format('m [min]');
  }

  return <span className="highlight Room-time">{timeF}</span>;
}
