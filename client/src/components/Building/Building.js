import React, { Component } from 'react';
import classnames from 'classnames';

import RoomsList from '../RoomsList/RoomsList';

import { connect } from 'react-redux';
import * as actions from '../../actions/roomAction';

import './Building.css';

class BItem extends Component {

  componentWillMount() {
    this.props.fetchRoomsInfo(this.props.name);
  }

  render() {
    const style = {
      backgroundImage: `url(${this.props.bgImageUrl})`
    }
    const classes = classnames({
      'BItem-wrapper': true,
      'expanded': this.props.selected === this.props.id,
      'hidden': this.props.selected !== this.props.id && this.props.selected !== -1
    })

    const floor = this.props.infos
    const bestFloor =  floor === null ? '' : (floor === 1 ? '1er' : floor + 'e')

    return (
      <div className={classes}>
        <div
          className="BItem-card"
          style={style}
          onClick={(e) => this.props.handleClick(this.props.id)}>
          <div className="overlay"></div>
          <div className="BItem-dashboard">
            <div className="BItem-buildingName">{this.props.name}</div>
            <div className="BItem-roomsLeft">
              <div className="BItem-roomsLeft-counter">
                <span>{this.props.freeRooms}</span>/{this.props.totalRooms}
                </div>
                <div className="BItem-roomsLeft-text">Disponibles</div>
              </div>
            </div>
          </div>
          {
            floor && <p className="BItem-subinfo secondary-color">Meilleur étage - {bestFloor}</p>
          }
      </div>
    )
  }
}

class BSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: -1 }
  }

  handleSelect(state) {
    console.log(state);
    this.props.selectRoom(this.state.selected === state ? -1 : state)

    const selectState = (this.state.selected === state ? -1 : state);
    this.setState({selected: selectState });
  }

  render() {
    return (
      <div>
        <div className="BSwitcher-switch">
          <BItem
            {...this.props}
            id={0}
            name="NDC"
            bgImageUrl="NDC.jpg"
            totalRooms={20}
            freeRooms={10}
            selected={this.state.selected}
            handleClick={(e) => this.handleSelect(e)}
          />
          <BItem
            {...this.props}
            id={1}
            name="NDL"
            bgImageUrl="NDL.jpg"
            totalRooms={20}
            freeRooms={7}
            selected={this.state.selected}
            handleClick={(e) => this.handleSelect(e)}
          />
        </div>
        <RoomsList
          selected={this.props.selected}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selected: state.room.selectedRoom,
    infos: state.room.bestFloor
  }
}

export default connect(mapStateToProps, actions)(BSwitcher)
