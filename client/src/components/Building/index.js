// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import Translate from '../Translate';

import RoomsList from '../RoomsList';

import BuildingMap from '../Map';
import { buildingsConf } from '../../map.conf';

import TimeMachine from '../TimeMachine';

import * as roomService from '../../services/rooms';

import './Building.css';

function BItem({ selected, bgImageUrl, name, getRoomStats, selectBuilding }) {
  const classes = classnames({
    'BItem-wrapper': true,
    expanded: selected === name,
    hidden: selected != null && selected !== name,
  });

  const floor = null;
  const bestFloor = floor === null ? '' : floor === 1 ? '1er' : floor + 'e';
  const { free, total } = getRoomStats(name);
  return (
    <div className={classes}>
      <div
        className="BItem-card"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
        onClick={e => selectBuilding(name)}
      >
        <div className="overlay" />
        <div className="BItem-dashboard">
          <div className="BItem-buildingName">{name}</div>
          <div className="BItem-roomsLeft">
            <div className="BItem-roomsLeft-counter">
              <span>{free}</span>/{total}
            </div>
            <div className="BItem-roomsLeft-text">
              <Translate t="building.available" />
            </div>
          </div>
        </div>
      </div>
      {floor && (
        <p className="BItem-subinfo secondary-color">
          Meilleur étage - {bestFloor}
        </p>
      )}
    </div>
  );
}

type State = {
  selectedBuilding: ?('NDC' | 'NDL'),
  loading: boolean,
  roomsNDC: any[],
  roomsNDL: any[],
  currentDate: ?Date,
};

class BSwitcher extends Component<{}, State> {
  state = {
    selectedBuilding: null,
    loading: false,
    currentDate: null,
    roomsNDC: [],
    roomsNDL: [],
  };

  componentDidMount() {
    this.fetchRooms();
  }

  async fetchRooms() {
    this.setState({ loading: true });
    let roomsNDC = await roomService.getBuildingRoomsEvents('NDC');
    let roomsNDL = await roomService.getBuildingRoomsEvents('NDL');
    roomsNDC = roomsNDC.map(r => ({
      room: r,
      currentStatus: { status: 'FREE', currentEvent: null },
    }));
    roomsNDL = roomsNDL.map(r => ({
      room: r,
      currentStatus: { status: 'FREE', currentEvent: null },
    }));
    this.setState({ roomsNDC, roomsNDL, loading: false });
  }

  // Scheduling update of currentEvent
  setupStatusUpdate() {
    const rooms = this.getSelectedBuildingRooms(this.state.selectedBuilding);
    this.updateStatus(rooms);
    this.updateScheduler = setInterval(() => {
      const rooms = this.getSelectedBuildingRooms(this.state.selectedBuilding);
      this.updateStatus(rooms);
    }, 1000 * 1);
  }

  componentWillUnmount() {
    this.clearUpdate();
  }

  clearUpdate() {
    clearInterval(this.updateScheduler);
  }

  updateStatus(rooms) {
    // const now = new Date(2018, 4, 11, 10, 10, 0);
    const now = this.getCurrentDate();
    const statuses = rooms.map(r => {
      const { status, currentEvent } = roomService.roomStatus(
        now,
        r.room.events
      );
      r.currentStatus = {
        status,
        currentEvent,
      };
      return r;
    });

    const { selectedBuilding } = this.state;
    if (selectedBuilding === 'NDC') {
      this.setState({ roomsNDC: statuses });
    } else if (selectedBuilding === 'NDL') {
      this.setState({ roomsNDL: statuses });
    }
  }

  handleSelect = selected => {
    if (this.state.selectedBuilding === selected) {
      this.setState({ selectedBuilding: null });
      this.clearUpdate();
      return;
    }
    this.setState({ selectedBuilding: selected });
    this.setupStatusUpdate();
  };

  getRoomsNbStats = building => {
    const rooms = this.getSelectedBuildingRooms(building);
    const { free } = roomService.filterRoomsByAvailability(
      rooms.map(r => r.room)
    );
    return { total: rooms.length, free: free.length };
  };

  getSelectedBuildingRooms(building) {
    if (building) {
      switch (building) {
        case 'NDC':
          return this.state.roomsNDC;
        case 'NDL':
          return this.state.roomsNDL;
        default:
          break;
      }
    }
    return [];
  }

  getCurrentDate() {
    return this.state.currentDate || new Date();
  }

  isMobile() {
    return typeof window.orientation !== 'undefined';
  }

  render() {
    const { selectedBuilding, currentDate } = this.state;
    const rooms = this.getSelectedBuildingRooms(selectedBuilding);
    return (
      <div className="BSwitcher-wrapper">
        {!this.isMobile() && (
          <TimeMachine
            now={currentDate}
            setDate={currentDate => this.setState({ currentDate })}
          />
        )}
        <div className="BSwitcher-switch">
          <BItem
            name="NDC"
            bgImageUrl="NDC.jpg"
            selected={selectedBuilding}
            getRoomStats={this.getRoomsNbStats}
            selectBuilding={this.handleSelect}
          />
          <BItem
            name="NDL"
            bgImageUrl="NDL.jpg"
            selected={selectedBuilding}
            getRoomStats={this.getRoomsNbStats}
            selectBuilding={this.handleSelect}
          />
        </div>
        <div className="content">
          <RoomsList
            selected={selectedBuilding}
            rooms={rooms}
            now={this.getCurrentDate()}
          />
          {selectedBuilding && (
            <div className="Map">
              <BuildingMap
                rooms={rooms}
                config={buildingsConf[this.state.selectedBuilding]}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BSwitcher;
