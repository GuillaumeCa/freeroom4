import * as roomSvc from './rooms';

describe('buildFloors', () => {
  it('should group rooms on same floor', () => {
    const rooms = [
      {
        floor: 1,
        id: 12,
      },
      {
        floor: 1,
        id: 11,
      },
      {
        floor: 2,
        id: 22,
      },
    ];
    const builtFloors = roomSvc.buildFloors(rooms);
    expect(builtFloors).toEqual([
      {
        floor: '1',
        rooms: [{ floor: 1, id: 12 }, { floor: 1, id: 11 }],
      },
      {
        floor: '2',
        rooms: [{ floor: 2, id: 22 }],
      },
    ]);
  });
});
