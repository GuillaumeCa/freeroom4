import React, { Component } from 'react';

import translate from 'counterpart';

export default class Translate extends Component {
  state = {
    translation: '',
  };

  componentDidMount() {
    this.setState({
      translation: this.getTranslation(),
    });
    translate.onLocaleChange((newLocale, oldLocale) => {
      this.setState({ translation: this.getTranslation() });
    });
  }

  getTranslation() {
    let opt = {};
    if (this.props.count) {
      opt.count = this.props.count;
    }
    if (this.props.data) {
      opt = {
        ...opt,
        ...this.props.data,
      };
    }
    return translate(this.props.t, opt);
  }

  render() {
    return <span>{this.state.translation}</span>;
  }
}
