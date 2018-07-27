import React, { Component } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import BSwitcher from './Building';

import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <BSwitcher />
    <Footer />
  </div>
);

export default App;
