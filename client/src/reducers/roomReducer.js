export default function reducer(state = {
  bestFloor: null,
  error: false,
  selectedRoom: -1
}, action)
{
  switch (action.type) {
    case 'FETCH_ROOMS_INFO_FINISHED': {
      return {
        ...state,
        bestFloor: action.payload.bestFloor,
        error: false
      }
    }
    case 'FETCH_ROOMS_INFO_FAILED': {
      return {
        ...state,
        error: true
      }
    }
    case 'SELECT_ROOM': {
      return {
        ...state,
        selectedRoom: action.payload
      }
    }
    default: {
      return state
    }
  }
}
