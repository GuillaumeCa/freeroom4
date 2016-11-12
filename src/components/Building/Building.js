import React, { Component } from 'react';
import classnames from 'classnames';

import RoomsList from '../RoomsList/RoomsList';

import './Building.css';

class BItem extends Component {
  render() {
    const style = {
      backgroundImage: `url(${this.props.bgImageUrl})`
    }
    const classes = classnames({
      'BItem-wrapper': true,
      'expanded': this.props.selected === this.props.id,
      'hidden': this.props.selected !== this.props.id && this.props.selected !== -1
    })
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
          <p className="BItem-subinfo secondary-color">Meilleur étage - {this.props.bestFloor}</p>
      </div>
    )
  }
}

export class BSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: -1 }
  }

  handleSelect(state) {
    console.log(state);
    const selectState = (this.state.selected === state ? -1 : state);
    this.setState({selected: selectState });
  }

  render() {
    return (
      <div>
        <div className="BSwitcher-switch">
          <BItem
            id={0}
            name="NDC"
            bgImageUrl="NDC.jpg"
            totalRooms={20}
            freeRooms={10}
            bestFloor="2e"
            selected={this.state.selected}
            handleClick={(e) => this.handleSelect(e)}
          />
          <BItem
            id={1}
            name="NDL"
            bgImageUrl="NDL.jpg"
            totalRooms={20}
            freeRooms={7}
            bestFloor="1er"
            selected={this.state.selected}
            handleClick={(e) => this.handleSelect(e)}
          />
        </div>
        <RoomsList
          selected={this.state.selected}
        />
      </div>
    )
  }
}
