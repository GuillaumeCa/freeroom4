// @flow

export class Event {
  desc: string;
  location: string;
  name: string;
  time: {
    start: number,
    end: number,
    startDate: string,
  };
}
