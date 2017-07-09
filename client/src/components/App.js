import React, { Component } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import BSwitcher from './Building';
import SadFace from './Face';

import './App.css';

class App extends Component {
  state = {

  }

  render() {
    return (
      <div className="App">
        <Header/>
        <BSwitcher/>
        {/* <SadFace posX={44} posY={93.7} /> */}
        <Footer/>
      </div>
    );
  }
}

export default App;
