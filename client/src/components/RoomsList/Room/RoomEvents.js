import React, { Component } from 'react';
import moment from 'moment';
import { array } from 'prop-types';

import LargeBtn from '../../Button/Large';
import Translate from '../../Translate';

import RightArrow from '../../Svg/RightArrow';
import LeftArrow from '../../Svg/LeftArrow';

export default class RoomEvents extends Component {
  state = {
    displayedEvents: [],
    eventIndex: 0,
  };

  static PropTypes = {
    events: array.isRequired,
  };

  componentDidMount() {
    const displayedEvents = this.getDisplayedEvents(this.props.events);
    this.setState({ displayedEvents });
  }

  getDisplayedEvents(events) {
    const now = new Date();
    return events
      .filter(e => {
        if (this.props.currentEvent) {
          return e.time.end > now.getTime();
        }
        return e.time.start > now.getTime();
      })
      .sort((a, b) => (a.time.start > b.time.start ? 1 : -1));
  }

  formatDate(date, withDate) {
    if (withDate && new Date().getDate() !== new Date(date).getDate()) {
      return moment(date).format('D MMMM H:mm');
    }
    return moment(date).format('H:mm');
  }

  onNextEvent = () => {
    const { eventIndex, displayedEvents } = this.state;
    if (displayedEvents.length === eventIndex + 1) return;
    this.setState({ eventIndex: this.state.eventIndex + 1 });
  };

  onPreviousEvent = () => {
    const { eventIndex, displayedEvents } = this.state;
    if (eventIndex === 0) return;
    this.setState({ eventIndex: this.state.eventIndex - 1 });
  };

  renderEvent(event) {
    const { name, desc, location, time } = event;
    const paragraphs = desc.split('\\n');
    return (
      <div className="event-info">
        <h3 className="event-title primary-color">{name}</h3>
        <p className="event-desc secondary-color">
          {paragraphs.map(p => (
            <span key={p}>
              {p}
              <br />
            </span>
          ))}
        </p>
        <span>{location}</span>
        <span>
          {this.formatDate(time.start, true)}&nbsp;-&nbsp;{this.formatDate(
            time.end
          )}
        </span>
      </div>
    );
  }

  render() {
    const { displayedEvents, eventIndex } = this.state;
    const eventRight = !!displayedEvents[eventIndex + 1];
    const eventLeft = !!displayedEvents[eventIndex - 1];
    return (
      <div className="RoomEvents">
        {displayedEvents.length > 0 && (
          <div className="events">
            {eventLeft && (
              <div className="sidebutton" onClick={this.onPreviousEvent}>
                <LeftArrow />
              </div>
            )}
            {this.renderEvent(displayedEvents[eventIndex])}
            {eventRight && (
              <div className="sidebutton" onClick={this.onNextEvent}>
                <RightArrow />
              </div>
            )}
          </div>
        )}
        {displayedEvents.length === 0 && <Translate t="events.no-events" />}
      </div>
    );
  }
}
