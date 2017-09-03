import React, { Component } from 'react';
import classnames from 'classnames';

import RoomsList from '../RoomsList';

import { connect } from 'react-redux';
import * as actions from '../../state/roomAction';

import BuildingMap from '../Map';
import { buildingsConf } from '../../map.conf';

import './Building.css';

class BItem extends Component {

  componentWillMount() {
    // this.props.roomInfos(this.props.name);
  }

  render() {

    const {

      selected,
      infos,
      name,
      freeRooms,
      totalRooms,

    } = this.props;

    const style = {
      backgroundImage: `url(${this.props.bgImageUrl})`
    }
    const classes = classnames({
      'BItem-wrapper': true,
      'expanded': selected === name,
      'hidden': selected != null && selected !== name
    })

    const floor = infos
    const bestFloor =  floor === null ? '' : (floor === 1 ? '1er' : floor + 'e')

    return (
      <div className={classes}>
        <div
          className="BItem-card"
          style={style}
          onClick={(e) => this.props.selectBuilding(name)}>
          <div className="overlay"></div>
          <div className="BItem-dashboard">
            <div className="BItem-buildingName">{name}</div>
            <div className="BItem-roomsLeft">
              <div className="BItem-roomsLeft-counter">
                <span>{freeRooms}</span>/{totalRooms}
              </div>
              <div className="BItem-roomsLeft-text">Disponibles</div>
            </div>
          </div>
        </div>
        {
          floor &&
          <p className="BItem-subinfo secondary-color">
            Meilleur étage - {bestFloor}
          </p>
        }
      </div>
    )
  }
}

class BSwitcher extends Component {

  state = {
    selected: null,
  }

  componentDidMount() {
    this.props.fetchRoomsInfo('NDC');
    this.props.fetchRoomsInfo('NDL');
  }

  handleSelect = (selected) => {
    if (this.state.selected === selected) {
      this.setState({ selected: null });
      return;
    }
    this.props.fetchRooms(selected);
    this.setState({ selected });
  }


  // Sépare les salles en 2 catégories: dispo et non dispo
  selectFreeRooms(rooms) {
    const now = (new Date()).getTime();
    const free = [];
    const notFree = [];
    if (rooms.length === 0) {
      return { free, notFree };
    }
    rooms.forEach(r => {
      let isFree = true;
      r.events.forEach(e => {
        if (now > e.time.start && now < e.time.end) {
          isFree = false;
          notFree.push(r);
        }
      })
      if (isFree) {
        free.push(r);
      }
    })
    return { free, notFree };
  }

  getRoomsNbStats(building) {
    if (this.state.selected === building) {
      const { free } = this.selectFreeRooms(this.props.rooms);
      return { total: this.props.rooms.length, free: free.length  };
    }
    const { stats } = this.props;
    if (stats.hasOwnProperty(building)) {
      const { freeRooms, totalRooms } = stats[building];
      return { free: freeRooms, total: totalRooms };
    }
    return { free: 0, total: 0 }
  }

  render() {

    const { selected } = this.state;
    const { rooms } = this.props;

    const { free, notFree } = this.selectFreeRooms(rooms);
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
            selected={selected}
            selectBuilding={this.handleSelect}
            roomInfos={this.props.fetchRoomsInfo}
          />
          <BItem
            name="NDL"
            bgImageUrl="NDL.jpg"
            totalRooms={ndlStats.total}
            freeRooms={ndlStats.free}
            selected={selected}
            selectBuilding={this.handleSelect}
            roomInfos={this.props.fetchRoomsInfo}
          />
        </div>
        <div className="content">
          <RoomsList
            selected={selected}
            freeRooms={free}
            notFree={notFree}
          />
          {
            selected &&
            <div className="Map">
              {/* Map coming back Soon :) */}
              <BuildingMap config={buildingsConf.NDC} />
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ room }) => ({
  rooms: room.fetchedRooms,
  stats: room.stats,
})

export default connect(mapStateToProps, actions)(BSwitcher)
