import React, { Component } from 'react';

class SadFace extends Component {
  render() {
    const color = '#7EBAFF'

    const posX = this.props.posX;
    const posY = this.props.posY;

    // const mouthPath = `M${posX},${posY} C44.4130946,96.2393871 66.2404786,77.6172147 90.0368548,77.6172147`
    const mouthPath = `M${posX},${posY} C44.4130946,96.2393871 66.2404786,77.6172147 90.0368548,77.6172147`
    const mouthPaths = [
      "M44.4130946,96.239387 C58.0000001,81.4781728 70.4261466,80.6224322 88.8909579,80.6224322",
      // "M46.2986746,88.5431813 C63.8235655,75.5647623 75.9649703,75.5647623 90.9338767,75.5647623",
      "M45.6938514,75.5647623 C45.6938514,75.5647623 90.3196906,75.5647623 90.3196906,75.5647623",
      "M44.4130946,96.239387 C58.0000001,81.4781728 70.4261466,80.6224322 88.8909579,80.6224322",
    ]

    return (
      <div style={{width: 300, height: 300}} >
        <svg viewBox="-1 -1 118 118">
          <path d="M58,116 C90.0325155,116 116,90.0325155 116,58 C116,25.9674845 90.0325155,0 58,0 C25.9674845,0 0,25.9674845 0,58 C0,90.0325155 25.9674845,116 58,116 Z M80.5,58 C86.8512746,58 92,52.8512746 92,46.5 C92,40.1487254 86.8512746,35 80.5,35 C74.1487254,35 69,40.1487254 69,46.5 C69,52.8512746 74.1487254,58 80.5,58 Z M35.5,57 C41.8512746,57 47,51.8512746 47,45.5 C47,39.1487254 41.8512746,34 35.5,34 C29.1487254,34 24,39.1487254 24,45.5 C24,51.8512746 29.1487254,57 35.5,57 Z" id="face" stroke={color} strokeWidth="2" fillOpacity="0.34" fill={color} fillRule="evenodd"></path>
          <path stroke={color} strokeWidth="2" fillOpacity="0">
            <animate
              attributeName="d"
              dur="5000ms"
              repeatCount="indefinite"

              values={mouthPaths.join(';')}
            ></animate>
          </path>
          {/* <path d={mouthPath} id="mouth" stroke={color} strokeWidth="2" fillOpacity="0" ></path> */}
          <circle id="eye-1" fill={color} cx="35.5" cy="45.5" r="3.5"></circle>
          <circle id="eye-2" fill={color} cx="81" cy="46" r="3"></circle>
        </svg>
      </div>
    );
  }
}

export default SadFace;
