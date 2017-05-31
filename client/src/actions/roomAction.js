import axios from 'axios';
import { API_URL } from '../config';

const FETCH_ROOMS_INFO_STARTED = 'FETCH_ROOMS_INFO_STARTED'
const FETCH_ROOMS_INFO_FINISHED = 'FETCH_ROOMS_INFO_FINISHED'
const FETCH_ROOMS_INFO_FAILED = 'FETCH_ROOMS_INFO_FAILED'
const SELECT_ROOM = 'SELECT_ROOM'

export function fetchRoomsInfo(building) {
  return dispatch => {
    dispatch({ type: FETCH_ROOMS_INFO_STARTED })
    axios.get(API_URL + '/infos/' + building)
      .then(response => dispatch({ type: FETCH_ROOMS_INFO_FINISHED, payload: response.data }))
      .catch(error => dispatch({ type: FETCH_ROOMS_INFO_FAILED, payload: error }))
  }
}

export function selectRoom(room) {
  return dispatch => dispatch({ type: SELECT_ROOM, payload: room })
}