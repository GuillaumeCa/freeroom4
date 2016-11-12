export default function reducer(state = {
  bestFloor: null,
  error: false
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
    default: {
      return state
    }
  }
}
