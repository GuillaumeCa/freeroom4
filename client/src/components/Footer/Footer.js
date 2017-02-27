import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    const date = new Date().getFullYear();
    return (
      <div className="Footer">
        <div>
          <a href="" className="link">Langues</a>
        </div>
        <div>
          <a href="" className="link">Changelog</a>
        </div>
        <div>
          <a href="" className="link">A propos</a>
        </div>
        <p className="text secondary-color">Copyright © {date} Guillaume Carré - <a href="http://www.isep.fr" className="link">ISEP</a></p>
      </div>
    );
  }
}

export default Footer;
