import React, { Component } from 'react';
import { string, array } from 'prop-types';
import Translate from '../../Translate';

import moment from 'moment';

import { FREE, FREE_FOR, NOT_FREE } from '../../../config';

import RoomTime from './RoomTime';
import RoomEvents from './RoomEvents';

export default class Room extends Component {
  state = {
    status: FREE,
    currentEvent: null,
    showEvents: false,
  };

  static propTypes = {
    roomID: string.isRequired,
    events: array.isRequired,
  };

  componentDidMount() {
    // Scheduling update of currentEvent
    this.updateStatus();
    this.updateScheduler = setInterval(() => {
      this.updateStatus();
    }, 1000 * 1);
  }

  componentWillUnmount() {
    clearInterval(this.updateScheduler);
  }

  updateStatus() {
    const { events } = this.props;
    const { status, currentEvent } = this.computeStatus(events);
    this.setState({ status, currentEvent });
  }

  computeStatus(events) {
    const now = new Date();
    const filtered = events
      .filter(e => new Date(e.time.start).getDate() === now.getDate())
      .sort((a, b) => (a.time.start > b.time.start ? 1 : -1));

    const nowTimestamp = now.getTime(); //+ 1000 * 60 * 60 * 9;
    for (const event of filtered) {
      const start = event.time.start;
      const end = event.time.end;
      if (start < nowTimestamp && nowTimestamp < end) {
        return { status: NOT_FREE, currentEvent: event };
      }
      if (start > nowTimestamp) {
        return { status: FREE_FOR, currentEvent: event };
      }
    }
    return { status: FREE, currentEvent: null };
  }

  toggleEvents = () => {
    this.setState({ showEvents: !this.state.showEvents });
  };

  renderStatus() {
    const { status, currentEvent } = this.state;
    switch (status) {
      case FREE:
        return (
          <span key={status}>
            <Translate t="room.free" />
          </span>
        );
      case FREE_FOR:
        return (
          <span key={status}>
            <Translate t="room.free-for" />{' '}
            <RoomTime time={currentEvent.time.start} />
          </span>
        );
      case NOT_FREE:
        return (
          <span key={status}>
            <Translate t="room.not-free" />{' '}
            <RoomTime time={currentEvent.time.end} />
          </span>
        );
    }
  }

  render() {
    const { roomID, events, available } = this.props;
    const { currentEvent, showEvents, status } = this.state;
    const renderedStatus = this.renderStatus();
    const backgroundColorRoom =
      status === NOT_FREE ? 'bg-secondary' : 'bg-primary';
    return (
      <div>
        <div
          className={`Room-item ${backgroundColorRoom}`}
          onClick={this.toggleEvents}
        >
          <h2 className="Room-id">{roomID}</h2>
          <div className="Room-status">{renderedStatus}</div>
        </div>
        {showEvents && <RoomEvents currentEvent={!available} events={events} />}
      </div>
    );
  }
}
