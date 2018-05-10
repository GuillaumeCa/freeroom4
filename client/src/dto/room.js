// @flow

import type { Building } from './building';
import type { Event } from './event';

export class Room {
  id: string;
  floor: number;
  building: Building;
  events: Event[];
}
