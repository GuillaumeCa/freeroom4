// @flow

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
