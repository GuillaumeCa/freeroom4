import React, { Component } from 'react';
import moment from 'moment';
import { array } from 'prop-types';

import LargeBtn from '../../Button/Large';

export default class RoomEvents extends Component {

  state = {
    nextEvents: [],
    eventIndex: 0,
  }

  static PropTypes = {
    events: array.isRequired,
  }

  componentDidMount() {
    const nextEvents = this.getNextEvents(this.props.events);
    this.setState({ nextEvents });
  }

  getNextEvents(events) {
    const now = new Date();
    return events.filter(e => e.time.start > now.getTime());
  }

  formatDate(date, withDate) {
    if (withDate && (new Date()).getDate() != (new Date(date)).getDate()) {
      return moment(date).format('D MMMM H:mm');
    }
    return moment(date).format('H:mm');
  }

  onNextEvent = () => {
    const { eventIndex, nextEvents } = this.state;
    if (nextEvents.length === eventIndex + 1) return;
    this.setState({ eventIndex: this.state.eventIndex + 1 });
  }

  onPreviousEvent = () => {
    const { eventIndex, nextEvents } = this.state;
    if (eventIndex === 0) return;
    this.setState({ eventIndex: this.state.eventIndex - 1 });
  }

  renderEvent(event) {
    const { name, desc, location, time } = event;
    const descF = desc.replace(/\\n/g, "<br>");
    return (
      <div>
        <h3 className="event-title primary-color">{name}</h3>
        <p className="event-desc secondary-color" dangerouslySetInnerHTML={{ __html: descF }}></p>
        <span>{location}</span>
        <span>{this.formatDate(time.start, true)}&nbsp;-&nbsp;{this.formatDate(time.end)}</span>
      </div>
    )
  }

  render() {
    const { nextEvents, eventIndex } = this.state;
    return (
      <div className="RoomEvents">
        {
          nextEvents.length > 0 ?
            this.renderEvent(nextEvents[eventIndex]) : <div>Pas d'évènement à venir</div>
        }
        {
          nextEvents.length > 0 &&
          <div>
            <LargeBtn label="Précédent" onClick={this.onPreviousEvent} />
            <LargeBtn label="Suivant" onClick={this.onNextEvent} />
          </div>
        }
      </div>
    )
  }
}
