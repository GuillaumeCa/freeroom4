import React, { Component } from 'react';
import { string, array } from 'prop-types';
import Translate from '../../Translate';

import moment from 'moment';

import { FREE, FREE_FOR, NOT_FREE } from '../../../config';

import RoomTime from './RoomTime';
import RoomEvents from './RoomEvents';

import * as roomService from '../../../services/rooms';

export default class Room extends Component {
  state = {
    showEvents: false,
  };

  static propTypes = {
    roomID: string.isRequired,
    events: array.isRequired,
  };

  toggleEvents = () => {
    this.setState({ showEvents: !this.state.showEvents });
  };

  renderStatus() {
    const { now } = this.props;
    const { status, currentEvent } = this.props.status;
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
            <RoomTime now={now} time={currentEvent.time.start} />
          </span>
        );
      case NOT_FREE:
        return (
          <span key={status}>
            <Translate t="room.not-free" />{' '}
            <RoomTime now={now} time={currentEvent.time.end} />
          </span>
        );
    }
  }

  render() {
    const { roomID, events, status } = this.props;
    const { showEvents } = this.state;
    const renderedStatus = this.renderStatus();
    const backgroundColorRoom =
      status.status === NOT_FREE ? 'bg-secondary' : 'bg-primary';
    return (
      <div>
        <div
          className={`Room-item ${backgroundColorRoom}`}
          onClick={this.toggleEvents}
        >
          <h2 className="Room-id">{roomID}</h2>
          <div className="Room-status">{renderedStatus}</div>
        </div>
        {showEvents && <RoomEvents status={status.status} events={events} />}
      </div>
    );
  }
}
