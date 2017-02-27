import axios from 'axios';
import { API_URL } from '../config';

export function fetchRoomsInfo(building) {
  return dispatch => {
    axios.get(API_URL + '/infos/' + building)
      .then(response => {
        dispatch({ type: 'FETCH_ROOMS_INFO_FINISHED', payload: response.data })
      })
      .catch(error => {
        dispatch({ type: 'FETCH_ROOMS_INFO_FAILED', payload: error })
      })
  }
}

export function selectRoom(room) {
  return dispatch => {
    dispatch({
      type: 'SELECT_ROOM',
      payload: room
    })
  }
}
