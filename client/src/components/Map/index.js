import React from 'react';

function Rect(props) {
  return <rect x={0} y={0} width={props.w} height={props.h} fill="#5CA7FD"></rect>
}

function Poly(props) {
  if (props.transform) {
    return <path d={props.path} transform={props.transform} fill="#5CA7FD"></path>
  }
  return <path d={props.path} fill="#5CA7FD"></path>
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
      {
        props.floor.type === 'RECT' ?
          <Rect w={pos.width} h={pos.height} />
          :
          <Poly path={props.floor.path} transform={props.floor.transform} />
      }
      {
        props.text &&
        <text
          x={props.text.x}
          y={props.text.y}
          fill={props.fill}
          textAnchor="middle"
          fontSize={props.text.fontSize || '15'}
          stroke={props.stroke}>{props.roomID}</text>
      }
    </svg>
  )
}

function FloorMap(props) {
  const style = {
    zIndex: -1,
    height: props.pos.height,
    width: props.pos.width,
    filter: 'drop-shadow(0 8px 15px #ccc)',
  }
  return (
    <svg style={style}>
      <path d={props.path} fill="#f3f3f3"></path>
    </svg>
  )
}

function BuildingMap(props) {
  let building = [...props.config];
  building.reverse()

  const style = {
    floorStyle: {
      position: 'relative',
      transform: 'rotateX(55deg)',
    },
    floorWrapper: {
      perspective: 500,
      height: 170,
      marginTop: -50
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
  }
  return (
    <div>
      {
        building.map(b => {
          let floorName = b.floor;
          if (Number(b.floor) === 0) floorName = 'RDC';
          if (Number(b.floor) === 1) floorName = '1er';
          if (Number(b.floor) > 1) floorName += 'e';
          return (
            <div key={b.floor} style={{ width: b.pos.width, height: b.pos.height, marginTop: -60 }}>
              <h1 style={style.floorName}>{floorName}</h1>
              <div style={style.floorWrapper}>
                <div style={style.floorStyle}>
                  {
                    b.rooms.map(r => {
                      return <RoomMap
                        key={r.id}
                        roomID={r.id}
                        pos={r.pos}
                        text={r.text}
                        floor={r.floor}
                        fill="#FFF"
                        stroke="#FFF" />
                    })
                  }
                  <FloorMap path={b.ground} pos={b.pos} />
                </div>
              </div>
            </div>
          )

        })
      }
    </div>
  )
}

export default BuildingMap;
