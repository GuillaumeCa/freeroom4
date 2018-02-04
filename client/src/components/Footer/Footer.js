import React, { Component } from 'react';
import './Footer.css';

import translate from 'counterpart';

import Button from '../Button/Large';
import Translate from '../Translate';

const Modal = (props) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255,255,255,.5)',
      zIndex: 100,
      pointerEvents: props.open ? 'auto' : 'none',
      opacity: props.open ? 1 : 0,
      transition: 'opacity .3s ease',
    }}>
      <div style={{
        maxWidth: 500,
        margin: '0 auto',
        marginTop: 100,
        background: 'white',
        ...props.style
      }}>
        {props.children}
      </div>
    </div>
  )
}

const ButtonLang = (props) => {
  return (
    <div className="ButtonLang bg-primary" onClick={props.onClick}>
      <span>{props.lang}</span>
    </div>
  )
};

class Footer extends Component {

  state = {
    modalOpen: false,
  }

  showLang = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  selectLang = lang => e => {
    translate.setLocale(lang);
    this.closeModal();
  };

  render() {
    const date = new Date().getFullYear();
    return (
      <div className="Footer">
        <Modal style={{
          padding: 20,
          minHeight: 500,
          boxShadow: '0 0 10px rgba(0,0,0,.2)'
        }} open={this.state.modalOpen}>
          <ButtonLang lang="Français" onClick={this.selectLang('fr')} />
          <ButtonLang lang="English" onClick={this.selectLang('en')} />
          <Button label="Ok" onClick={this.closeModal} />
        </Modal>
        <div>
          <span className="link" onClick={this.showLang}><Translate t="footer.languagesLabel" /></span>
        </div>
        {/* <div>
          <span className="link">Changelog</span>
        </div>
        <div>
          <span className="link">A propos</span>
        </div> */}
        <p className="text secondary-color">Copyright © {date} Guillaume Carré - <a href="http://www.isep.fr" className="link">ISEP</a></p>
      </div>
    );
  }
}

export default Footer;
