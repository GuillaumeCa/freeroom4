import axios from 'axios';
import { API_URL } from '../config';

export const FETCH_ROOMS_INFO_FINISHED = 'FETCH_ROOMS_INFO_FINISHED'
export const FETCH_ROOMS_INFO_FAILED = 'FETCH_ROOMS_INFO_FAILED'

export const FETCH_ROOMS_START = 'FETCH_ROOMS_START'
export const FETCH_ROOMS_FINISHED = 'FETCH_ROOMS_FINISHED'
export const FETCH_ROOMS_FAILED = 'FETCH_ROOMS_FAILED'

export function fetchRoomsInfo(building) {
  return dispatch => {
    axios.get(API_URL + '/building/' + building + '/infos')
      .then(response => dispatch({
        type: FETCH_ROOMS_INFO_FINISHED,
        payload: response.data,
        building
      }))
      .catch(error => dispatch({
        type: FETCH_ROOMS_INFO_FAILED,
        payload: error
      }))
  }
}

export function fetchRooms(building) {
  return dispatch => {
    dispatch({
      type: FETCH_ROOMS_START
    })
    axios.get(API_URL + '/building/' + building)
      .then(response => dispatch({
        type: FETCH_ROOMS_FINISHED,
        payload: response.data.rooms
      }))
      .catch(error => dispatch({
        type: FETCH_ROOMS_FAILED,
        payload: error
      }))
  }
}
