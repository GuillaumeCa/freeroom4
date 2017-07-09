
function MapRoom(props) {

  const style = {
    top: props.top,
    left: props.left,
    width: props.width,
    height: props.height,
  }

  return (
    <svg style={style}>
      <rect x={0} y={0} width={props.width} height={props.height}></rect>
      <text x="50%" y="60%" fill={props.color} textAnchor="middle" stroke={props.color}>{props.roomNB}</text>
    </svg>
  )
}

function MapFloor(props) {
  return (
    <svg>
      <path d={props.path}/>
    </svg>
  )
}
