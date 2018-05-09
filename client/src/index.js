import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import App from './components/App';
import './index.css';

// import registerServiceWorker from './registerServiceWorker';

import './setupLocales';

import moment from 'moment';

import 'moment/locale/fr';
moment.locale('fr');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
