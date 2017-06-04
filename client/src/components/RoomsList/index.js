import React, { Component } from 'react';
import './RoomsList.css';
import { SALLES_NDC } from '../../config';

import moment from 'moment';
moment.locale('fr')

const FREE = 'FREE';
const FREE_FOR = 'FREE_FOR';


function RoomTime({ time }) {
  const now = new Date();
  const diff = time - now.getTime();
  let timeF = moment(diff).format('H[h]mm')
  if (diff / (1000 * 60 * 60) < 1) {
    timeF = moment(diff).format('m [min]')
  }

  return <span className="highlight Room-time">{timeF}</span>;
}


function Floor({ floor, children }) {
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


class RoomEvents extends Component {

  state = {
    nextEvents: [],
    eventIndex: 0,
  }

  componentDidMount() {
    const nextEvents = this.getNextEvents(this.props.events);
    this.setState({ nextEvents });
  }

  getNextEvents(events) {
    const now = new Date();
    return events.filter(e => e.time.start > now.getTime());
  }

  formatDate(date) {
    return moment(date).format('H:mm');
  }

  onNextEvent = () => {
    const { eventIndex, nextEvents } = this.state;
    if (nextEvents.length === eventIndex + 1) return;
    this.setState({ eventIndex: this.state.eventIndex + 1 });
  }

  onPreviousEvent = () => {
    const { eventIndex, nextEvents } = this.state;
    if (eventIndex === 0) return;
    this.setState({ eventIndex: this.state.eventIndex - 1 });
  }

  renderEvent(event) {
    const { name, desc, location, time } = event;
    const descF = desc.replace(/\\n/g, "<br>");
    return (
      <div>
        <h3 className="event-title primary-color">{name}</h3>
        <p className="event-desc secondary-color" dangerouslySetInnerHTML={{ __html: descF }}></p>
        <span>{location}</span>
        <span>{this.formatDate(time.start)}&nbsp;-&nbsp;{this.formatDate(time.end)}</span>
      </div>
    )
  }

  render() {
    const { nextEvents, eventIndex } = this.state;
    return (
      <div className="RoomEvents">
        { nextEvents.length > 0 && this.renderEvent(nextEvents[eventIndex])}
        <button onClick={this.onPreviousEvent}>previous</button>
        <button onClick={this.onNextEvent}>next</button>
      </div>
    )
  }
}

class Room extends Component {

  state = {
    status: FREE,
    currentEvent: null,
    showEvents: false,
  }

  componentDidMount() {
    // Scheduling update of currentEvent
    this.updateStatus()
    setInterval(() => {
      this.updateStatus();
    }, 1000 * 60);
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
    for (let e of filtered) {
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
        { showEvents && <RoomEvents events={events} /> }
      </div>
    )
  }
}

class RoomsList extends Component {

  buildFloors(rooms) {
    const floors = {}
    const floorsList = [];
    rooms.forEach(r => {
      if (floors[r.floor] == null) floors[r.floor] = [];
      floors[r.floor].push(r);
    })
    Object.keys(floors).forEach(k => {
      floorsList.push({
        floor: k,
        rooms: floors[k]
      })
    })
    return floorsList;
  }

  render() {
    const { freeRooms, notFree } = this.props
    const floors = this.buildFloors(freeRooms);
    const list = floors.map((item, index) => (
      <Floor key={index} floor={item.floor}>
        {
          item.rooms.map((room, index) => {
            return (
              <div key={index}>
                <Room roomID={room.id} events={room.events} />
              </div>
            )
          })
        }
      </Floor>
    ))
    return (
      <div className="RoomsList">
        { this.props.selected != null && list }
      </div>
    )
  }
}

export default RoomsList
