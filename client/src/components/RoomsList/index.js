import React, { Component } from 'react';
import './RoomsList.css';

import moment from 'moment';

import Room from './Room';
import Floor from './Floor';

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
