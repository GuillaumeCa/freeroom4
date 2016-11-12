import React, { Component } from 'react';
import './RoomsList.css';
import { SALLES_NDC } from '../../config';

import { connect } from 'react-redux';
import * as actions from '../../actions/roomAction';

const list = [
  {
    id: 'N43',
    floor: 4,
    events: [
      {
        title: 'N43 - test1',
        start: new Date().getTime() + 10000,
        end: new Date().getTime() + 12000
      },
      {
        title: 'N43 - test2',
        start: new Date().getTime() + 20000,
        end: new Date().getTime() + 22000
      },
    ]
  },
  {
    id: 'N46',
    floor: 4,
    events: [
      {
        title: 'N44 - test1',
        start: new Date().getTime() - 1000,
        end: new Date().getTime() + 12000
      },
      {
        title: 'N44 - test2',
        start: new Date().getTime() + 13000,
        end: new Date().getTime() + 22000
      },
    ]
  }
]

function RoomTime(props) {
  const getTime = function (timestamp) {
    return new Date(timestamp).toLocaleTimeString()
  }
  return <div>{props.title} - {getTime(props.start)} - {getTime(props.end)}</div>
}

function Room(props) {
  // const current = props.current ? <div>CURRENT: <RoomTime {...props.current} /></div> : ''
  // const next = props.next ? <div>NEXT: <RoomTime {...props.next} /></div> : ''
  // return (
  //   <div>
  //     <div>{props.id} - {props.status === 'free' ? 'disponible' : 'non disponible'}</div>
  //     {current}
  //     {next}
  //     <ul>
  //       { props.events.map((item, index) => <li key={index}><RoomTime {...item} /></li>)}
  //     </ul>
  //   </div>
  // )
  //
  return (
    <div className="Room-item bg-primary">
      <h2 className="Room-id">{props.roomID}</h2>
      <div className="Room-status">libre pour <span className="highlight Room-time">5 min</span></div>
    </div>
  )
}

function Floor(props) {
  return (
    <div className="RoomsList-floor">
      <h3 className="RoomsList-floor-name secondary-color">{props.floorName}</h3>
      {props.children}
    </div>
  )
}


class RoomsList extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      list,
      frame: SALLES_NDC
    }
  }

  componentWillMount() {
    this.props.fetchRoomsInfo('NDC');
  }

  componentDidMount() {
    setInterval(() => {
      this.checkRoomOccupation()
    }, 1000)
  }

  checkRoomOccupation() {
    const date = new Date()
    const update = this.state.list.map(room => {
      room.current = room.events.filter(e => e.start < date && date < e.end )[0]
      room.next = room.events.filter(e => date < e.start)[0]
      return room
    })

    this.setState({
      ...this.state,
      list: update
    })
  }

  getEventsForRoom(room) {
    this.state.list
      .filter(item => item.id === room)
      .map(room => ({
        current: room.current,
        next: room.next
      }))
  }

  render() {
    const list = this.state.frame
      .map((item, index) => (
        <Floor key={index} floorName={item.floor}>
          {item.salles.map((room, index) => {
            const events = this.getEventsForRoom(room)
            return <Room key={index} roomID={room} {...events} />
          })}
        </Floor>
        // <Room
        //   key={index}
        //   id={item.id}
        //   status={item.status}
        //   events={item.events}
        //   current={item.current}
        //   next={item.next} />
      ))
    return (
      <div className="RoomsList">
        { list }
        <p>bestFloor: {this.props.infos}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    infos: state.room.bestFloor
  }
}

export default connect(mapStateToProps, actions)(RoomsList)
