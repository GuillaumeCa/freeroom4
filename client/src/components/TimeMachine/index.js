// @flow
import React, { Component } from 'react';
import moment from 'moment';

import Translate from '../Translate';

import './TimeMachine.css';

type State = {
  edit: boolean,
  date: ?Date,
};

type Props = {
  setDate: (date: ?Date) => mixed,
};

class TimeMachine extends Component<Props, State> {
  state = {
    edit: false,
    date: null,
  };

  toggleEdit = () => {
    const newState = !this.state.edit;
    this.setState({ edit: newState });
    if (newState) {
      this.props.setDate(new Date());
      this.setState({ date: new Date() });
    } else {
      this.props.setDate(null);
    }
  };

  setDate = (dateComp: string) => e => {
    const newDate = moment(this.state.date)
      .set(dateComp, parseInt(e.target.value, 10))
      .toDate();
    this.props.setDate(newDate);
    this.setState({ date: newDate });
  };

  formatMinute(number: number) {
    const rounded = 5 * Math.ceil(Math.abs(number / 5));
    if (rounded < 10) {
      return '0' + rounded;
    }
    return rounded;
  }

  render() {
    const { edit, date } = this.state;
    return (
      <div className="TimeMachine-wrapper">
        {!edit && (
          <span className="highlight TimeMachine-label">
            <Translate t="timemachine.now" />
          </span>
        )}
        {edit &&
          date && (
            <div style={{ display: 'inline-block' }}>
              <div className="TimeMachine-dateinput">
                <input
                  className="highlight TimeMachine-input"
                  style={{ textAlign: 'right', marginRight: 5 }}
                  type="number"
                  value={date.getDate()}
                  onChange={this.setDate('date')}
                />
                <span className="highlight TimeMachine-label">
                  {moment(date).format('MMMM YYYY')}
                </span>
                <input
                  className="highlight TimeMachine-input"
                  type="number"
                  style={{ textAlign: 'right' }}
                  value={date.getHours()}
                  onChange={this.setDate('hour')}
                />
                <span className="highlight TimeMachine-label TimeMachine-no-margin">
                  :
                </span>
                <input
                  type="number"
                  step="5"
                  value={this.formatMinute(date.getMinutes())}
                  onChange={this.setDate('minute')}
                />
              </div>
            </div>
          )}
        <span className="highlight TimeMachine-btn" onClick={this.toggleEdit}>
          <i>
            {edit ? (
              <Translate key={1} t="timemachine.cancel" />
            ) : (
              <Translate key={2} t="timemachine.edit" />
            )}
          </i>
        </span>
      </div>
    );
  }
}

export default TimeMachine;
