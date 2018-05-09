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
        {item.rooms.map((room, index) => {
          return (
            <div key={index}>
              <Room roomID={room.id} events={room.events} />
            </div>
          );
        })}
      </Floor>
    );
  };

  render() {
    const { freeRooms, notFree } = this.props;
    const freeFloors = roomService.buildFloors(freeRooms);
    // const notFreeFloors = roomService.buildFloors(notFree);
    if (this.props.selected) {
      return (
        <div className="RoomsList">
          {/* <Button label="Afficher indisponible" /> */}
          {freeFloors.map(this.renderFloor)}
        </div>
      );
    }
    return null;
  }
}

export default RoomsList;
