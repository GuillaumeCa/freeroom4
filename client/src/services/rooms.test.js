import * as roomSvc from './rooms';
import { FREE, FREE_FOR, NOT_FREE } from '../config';

describe('buildFloors', () => {
  it('should group rooms on same floor', () => {
    const rooms = [
      {
        room: {
          floor: 1,
          id: 12,
        },
      },
      {
        room: {
          floor: 1,
          id: 11,
        },
      },
      {
        room: {
          floor: 2,
          id: 22,
        },
      },
    ];
    const builtFloors = roomSvc.buildFloors(rooms);
    expect(builtFloors).toEqual([
      {
        floor: '1',
        rooms: [{ room: { floor: 1, id: 12 } }, { room: { floor: 1, id: 11 } }],
      },
      {
        floor: '2',
        rooms: [{ room: { floor: 2, id: 22 } }],
      },
    ]);
  });
});

function timestamp(year, month, day, hour, minute, second) {
  return new Date(year, month, day, hour, minute, second).getTime();
}

describe('roomStatus', () => {
  it('should have a "FREE" status when there are no events', () => {
    const events = [];
    const now = new Date(2018, 0, 1, 0, 0, 0);
    const status = roomSvc.roomStatus(now, events);
    expect(status.status).toEqual(FREE);
    expect(status.currentEvent).toBeNull();
  });

  it('should have a "FREE" status when there are no events after the current date', () => {
    const events = [
      {
        time: {
          start: timestamp(2018, 0, 1, 10, 0, 0),
          end: timestamp(2018, 0, 1, 12, 0, 0),
        },
      },
    ];
    const now = new Date(2018, 0, 1, 13, 0, 0);
    const status = roomSvc.roomStatus(now, events);
    expect(status.status).toEqual(FREE);
    expect(status.currentEvent).toBeNull();
  });

  it('should have a "FREE_FOR" status when there is an event after the current date', () => {
    const event = {
      time: {
        start: timestamp(2018, 0, 1, 12, 0, 0),
        end: timestamp(2018, 0, 1, 13, 0, 0),
      },
    };
    const now = new Date(2018, 0, 1, 11, 0, 0);
    const status = roomSvc.roomStatus(now, [event]);
    expect(status.status).toEqual(FREE_FOR);
    expect(status.currentEvent).toEqual(event);
  });

  it('should have a "NOT_FREE" status when there is an event happening at the current date', () => {
    const event = {
      time: {
        start: timestamp(2018, 0, 1, 10, 0, 0),
        end: timestamp(2018, 0, 1, 13, 0, 0),
      },
    };
    const now = new Date(2018, 0, 1, 11, 0, 0);
    const status = roomSvc.roomStatus(now, [event]);
    expect(status.status).toEqual(NOT_FREE);
    expect(status.currentEvent).toEqual(event);
  });
});
