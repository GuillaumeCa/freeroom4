import React, { Component } from 'react';
import { string, array } from 'prop-types';

import moment from 'moment';

import {
  FREE,
  FREE_FOR,
} from '../../../config';

import RoomTime from './RoomTime';
import RoomEvents from './RoomEvents';


export default class Room extends Component {

  state = {
    status: FREE,
    currentEvent: null,
    showEvents: false,
  }

  static propTypes = {
    roomID: string.isRequired,
    events: array.isRequired,
  }

  componentDidMount() {
    // Scheduling update of currentEvent
    this.updateStatus()
    this.updateScheduler = setInterval(() => {
      this.updateStatus();
    }, 1000 * 1);
  }

  componentWillUnmount() {
    clearInterval(this.updateScheduler)
  }

  updateStatus() {
    const { events } = this.props;
    const { status, currentEvent } = this.computeStatus(events);
    this.setState({ status, currentEvent });
  }

  computeStatus(events) {
    const now = new Date();
    const filtered = events.sort((a, b) => a.time.start > b.time.start)
      .filter(e => (new Date(e.time.start)).getDate() === now.getDate())
    for (const e of filtered) {
      const start = e.time.start;
      if (start > now.getTime()) {
        return { status: FREE_FOR, currentEvent: e };
      }
    }
    return { status: FREE, currentEvent: null };
  }

  toggleEvents = () => {
    this.setState({ showEvents: !this.state.showEvents });
  }

  renderStatus() {
    const { status, currentEvent } = this.state
    switch (status) {
      case FREE:
        return <span>libre</span>;
      case FREE_FOR:
        return <span>libre pendant <RoomTime time={currentEvent.time.start} /></span>;
    }
  }

  render() {
    const { roomID, events } = this.props
    const { currentEvent, showEvents } = this.state
    const renderedStatus = this.renderStatus();
    return (
      <div>
        <div className="Room-item bg-primary" onClick={this.toggleEvents}>
          <h2 className="Room-id">{roomID}</h2>
          <div className="Room-status">{renderedStatus}</div>
        </div>
        {showEvents && <RoomEvents events={events} />}
      </div>
    )
  }
}
