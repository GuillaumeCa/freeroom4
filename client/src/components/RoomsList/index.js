import React, { Component } from 'react';
import './RoomsList.css';

import moment from 'moment';

import Room from './Room';
import Floor from './Floor';

import Button from '../Button/Large';

import * as roomService from '../../services/rooms';

class RoomsList extends Component {
  renderFloor = (item, index) => {
    return (
      <Floor key={index} floor={item.floor}>
        {item.rooms.map((r, index) => {
          return (
            <div key={index}>
              <Room
                now={this.props.now}
                status={r.currentStatus}
                roomID={r.room.id}
                events={r.room.events}
              />
            </div>
          );
        })}
      </Floor>
    );
  };

  render() {
    const { rooms } = this.props;
    const roomsFloor = roomService.buildFloors(rooms);
    // const notFreeFloors = roomService.buildFloors(notFree);
    if (this.props.selected) {
      return (
        <div className="RoomsList">
          {/* <Button label="Afficher indisponible" /> */}
          {roomsFloor.map(this.renderFloor)}
        </div>
      );
    }
    return null;
  }
}

export default RoomsList;
