// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import Translate from '../Translate';

import RoomsList from '../RoomsList';

import { connect } from 'react-redux';
import * as actions from '../../state/roomAction';

import BuildingMap from '../Map';
import { buildingsConf } from '../../map.conf';

import * as roomService from '../../services/rooms';

import './Building.css';

function BItem({
  selected,
  bgImageUrl,
  name,
  freeRooms,
  totalRooms,
  selectBuilding,
}) {
  const classes = classnames({
    'BItem-wrapper': true,
    expanded: selected === name,
    hidden: selected != null && selected !== name,
  });

  const floor = null;
  const bestFloor = floor === null ? '' : floor === 1 ? '1er' : floor + 'e';

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
              <span>{freeRooms}</span>/{totalRooms}
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

class BSwitcher extends Component {
  state = {
    selectedBuilding: null,
  };

  componentDidMount() {
    this.props.fetchRoomsInfo('NDC');
    this.props.fetchRoomsInfo('NDL');
  }

  handleSelect = selectedBuilding => {
    if (this.state.selectedBuilding === selectedBuilding) {
      this.setState({ selectedBuilding: null });
      return;
    }
    this.props.fetchRooms(selectedBuilding);
    this.setState({ selectedBuilding });
  };

  getRoomsNbStats(building) {
    const { stats, rooms } = this.props;
    if (this.state.selectedBuilding === building) {
      const { free } = roomService.filterRoomsByAvailability(rooms);
      return { total: this.props.rooms.length, free: free.length };
    }
    if (stats.hasOwnProperty(building)) {
      const { freeRooms, totalRooms } = stats[building];
      return { free: freeRooms, total: totalRooms };
    }
    return { free: 0, total: 0 };
  }

  render() {
    const { selectedBuilding } = this.state;
    const { rooms } = this.props;

    //const { free, notFree } = roomService.filterRoomsByAvailability(rooms);
    const free = rooms;
    const ndcStats = this.getRoomsNbStats('NDC');
    const ndlStats = this.getRoomsNbStats('NDL');
    return (
      <div>
        <div className="BSwitcher-switch">
          <BItem
            name="NDC"
            bgImageUrl="NDC.jpg"
            totalRooms={ndcStats.total}
            freeRooms={ndcStats.free}
            selected={selectedBuilding}
            selectBuilding={this.handleSelect}
          />
          <BItem
            name="NDL"
            bgImageUrl="NDL.jpg"
            totalRooms={ndlStats.total}
            freeRooms={ndlStats.free}
            selected={selectedBuilding}
            selectBuilding={this.handleSelect}
          />
        </div>
        <div className="content">
          <RoomsList
            selected={selectedBuilding}
            freeRooms={free}
            // notFree={notFree}
          />
          {selectedBuilding && (
            <div className="Map">
              <BuildingMap
                config={buildingsConf[this.state.selectedBuilding]}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ room }) => ({
  rooms: room.fetchedRooms,
  stats: room.stats,
});

export default connect(mapStateToProps, actions)(BSwitcher);
