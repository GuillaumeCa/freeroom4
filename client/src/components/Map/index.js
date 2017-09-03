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
          stroke={props.stroke}>{props.roomID}</text>
      }
    </svg>
  )
}

function FloorMap(props) {
  const style = {
    zIndex: -1,
    height: 195,
    width: 320,
    filter: 'drop-shadow(0 8px 15px #ccc)',
  }
  return (
    <svg style={style}>
      <path d={props.path} fill="#f3f3f3"></path>
    </svg>
  )
}

function BuildingMap(props) {
  let building = [...props.config ];
  building.reverse()
  const floorStyle = {
    position: 'relative',
    transform: 'rotateX(55deg)',
  }
  const floorWrapper = {
    perspective: 500,
    height: 170,
    marginTop: -50
  }
  const floorName = {
    position: 'relative',
    left: -74,
    transform: 'scale(4)',
    transformOrigin: '13px 13px',
    color: '#d2d2d2',
  }
  return (
    <div>
      {
        building.map(b => {
          return (
            <div key={b.floor} style={{ width: 320, height: 195, marginTop: -60 }}>
              {/* <h1 style={floorName}>{b.floor}</h1> */}
              <div style={floorWrapper}>
                <div style={floorStyle}>
                  {
                    b.rooms.map(r => {
                      return <RoomMap
                        key={r.id}
                        roomID={r.id}
                        pos={r.pos}
                        text={r.text}
                        floor={r.floor}
                        fill="#FFF"
                             stroke="#FFF"/>
                    })
                  }
                  <FloorMap path={b.ground} />
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
