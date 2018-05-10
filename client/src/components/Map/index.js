import React from 'react';

import * as roomService from '../../services/rooms';

import {
  FREE,
  NOT_FREE,
  FREE_FOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../../config';

function Rect(props) {
  return (
    <rect x={0} y={0} width={props.w} height={props.h} fill={props.color} />
  );
}

function Poly(props) {
  if (props.transform) {
    return (
      <path d={props.path} transform={props.transform} fill={props.color} />
    );
  }
  return <path d={props.path} fill={props.color} />;
}

function RoomMap(props) {
  const pos = props.pos;
  const style = {
    zIndex: 1,
    top: pos.top,
    left: pos.left,
    width: pos.width,
    height: pos.height,
    position: 'absolute',
  };
  return (
    <svg style={style}>
      {props.floor.type === 'RECT' ? (
        <Rect w={pos.width} h={pos.height} color={props.color} />
      ) : (
        <Poly
          path={props.floor.path}
          transform={props.floor.transform}
          color={props.color}
        />
      )}
      {props.text && (
        <text
          x={props.text.x}
          y={props.text.y}
          fill={props.fill}
          textAnchor="middle"
          fontSize={props.text.fontSize || '15'}
          stroke={props.stroke}
        >
          {props.roomID}
        </text>
      )}
    </svg>
  );
}

class RoomStatus extends React.Component {
  state = {
    status: FREE,
  };

  componentDidMount() {
    // Scheduling update of currentEvent
    this.updateStatus();
    this.updateScheduler = setInterval(() => {
      this.updateStatus();
    }, 1000 * 1);
  }

  componentWillUnmount() {
    clearInterval(this.updateScheduler);
  }

  updateStatus() {
    const { room } = this.props;
    if (room) {
      const now = new Date(2018, 4, 11, 10, 10, 0);
      const { status } = roomService.roomStatus(now, room.events);
      this.setState({ status });
    }
  }

  render() {
    const { id, pos, text, floor } = this.props;
    const { status } = this.state;
    return (
      <RoomMap
        roomID={id}
        pos={pos}
        text={text}
        floor={floor}
        color={status === NOT_FREE ? SECONDARY_COLOR : PRIMARY_COLOR}
        fill="#FFF"
        stroke="#FFF"
      />
    );
  }
}

function FloorMap(props) {
  const style = {
    zIndex: -1,
    height: props.pos.height,
    width: props.pos.width,
    filter: 'drop-shadow(0 8px 15px #ccc)',
  };
  return (
    <svg style={style}>
      <path d={props.path} fill="#f3f3f3" />
    </svg>
  );
}

function floorName(floor) {
  const floorNb = Number(floor);
  if (floorNb === 0) {
    return 'RDC';
  } else if (floorNb === 1) {
    return '1er';
  } else {
    return (floor += 'e');
  }
}

function BuildingMap({ config, rooms }) {
  let building = [...config];
  building.reverse();

  const style = {
    floorStyle: {
      position: 'relative',
      transform: 'rotateX(55deg)',
    },
    floorWrapper: {
      perspective: 500,
      height: 170,
      marginTop: -50,
    },
    floorName: {
      position: 'relative',
      left: -100,
      top: 50,
      margin: 0,
      transform: 'scale(2)',
      transformOrigin: '13px 13px',
      color: '#d2d2d2',
    },
  };
  return (
    <div>
      {building.map(b => (
        <div
          key={b.floor}
          style={{ width: b.pos.width, height: b.pos.height, marginTop: -60 }}
        >
          <h1 style={style.floorName}>{floorName(b.floor)}</h1>
          <div style={style.floorWrapper}>
            <div style={style.floorStyle}>
              {b.rooms.map(r => {
                const room = rooms.find(room => room.room.id === r.id);
                const status = room ? room.currentStatus.status : null;
                return (
                  <RoomMap
                    key={r.id}
                    roomID={r.id}
                    pos={r.pos}
                    text={r.text}
                    floor={r.floor}
                    color={
                      status === NOT_FREE ? SECONDARY_COLOR : PRIMARY_COLOR
                    }
                    fill="#FFF"
                    stroke="#FFF"
                  />
                );
              })}
              <FloorMap path={b.ground} pos={b.pos} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BuildingMap;
