import React, { Component } from 'react';
import './Header.css';


class Header extends Component {

  render() {
    return (
      <div>
        <h1 className="Header-title">FreeRoom</h1>
        <h2 className="Header-subtitle">Trouvez facilement une salle disponible !</h2>
      </div>
    );
  }
}

export default Header;
