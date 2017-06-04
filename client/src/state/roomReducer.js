import {

  FETCH_ROOMS_INFO_FINISHED,
  FETCH_ROOMS_INFO_FAILED,

  FETCH_ROOMS_START,
  FETCH_ROOMS_FINISHED,
  FETCH_ROOMS_FAILED,

} from './roomAction';


const defaultState = {
  bestFloor: null,
  error: false,
  selectedRoom: null,
  fetchedRooms: [],
  stats: {},
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_ROOMS_INFO_FINISHED: {
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.building]: action.payload
        },
        error: false
      }
    }

    case FETCH_ROOMS_INFO_FAILED: {
      return {
        ...state,
        error: true
      }
    }

    case FETCH_ROOMS_START: {
      return {
        ...state,
        fetchedRooms: []
      }
    }
    case FETCH_ROOMS_FINISHED: {
      return {
        ...state,
        fetchedRooms: action.payload
      }
    }

    default: {
      return state
    }
  }
}
