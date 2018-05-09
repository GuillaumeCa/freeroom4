// @flow

import { FREE, FREE_FOR, NOT_FREE } from '../config';

// Sépare les salles en 2 catégories: dispo et non dispo
export function filterRoomsByAvailability(rooms) {
  const now = new Date().getTime();
  // const now = new Date().getTime() + 1000 * 60 * 60 * 9;
  const free = [];
  const notFree = [];
  if (rooms.length === 0) {
    return { free, notFree };
  }
  rooms.forEach(r => {
    let isFree = true;
    r.events.forEach(e => {
      if (now > e.time.start && now < e.time.end) {
        isFree = false;
        notFree.push(r);
      }
    });
    if (isFree) {
      free.push(r);
    }
  });
  return { free, notFree };
}

export function buildFloors(rooms) {
  const floors = {};
  const floorsList = [];
  rooms.forEach(r => {
    if (floors[r.floor] == null) floors[r.floor] = [];
    floors[r.floor].push(r);
  });
  Object.keys(floors).forEach(k => {
    floorsList.push({
      floor: k,
      rooms: floors[k],
    });
  });
  return floorsList;
}

export function roomStatus(date, events) {
  const filtered = events
    .filter(e => new Date(e.time.start).getDate() === date.getDate())
    .sort((a, b) => (a.time.start > b.time.start ? 1 : -1));

  const nowTimestamp = date.getTime(); //+ 1000 * 60 * 60 * 9;
  for (const event of filtered) {
    const start = event.time.start;
    const end = event.time.end;
    if (start < nowTimestamp && nowTimestamp < end) {
      return { status: NOT_FREE, currentEvent: event };
    }
    if (start > nowTimestamp) {
      return { status: FREE_FOR, currentEvent: event };
    }
  }
  return { status: FREE, currentEvent: null };
}
