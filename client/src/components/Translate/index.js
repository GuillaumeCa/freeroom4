import React, { Component } from 'react';

import translate from 'counterpart';

export default class Translate extends Component {
  state = {
    translation: '',
  }

  componentDidMount() {
    this.setState({
      translation: this.getTranslation(),
    })
    translate.onLocaleChange((newLocale, oldLocale) => {
      this.setState({ translation: this.getTranslation() })
    });
  }

  getTranslation() {
    return translate(this.props.t);
  }

  render() {
    return <span>{this.state.translation}</span>;
  }
}