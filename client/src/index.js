import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import App from './components/App';
import './index.css';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr')

console.log('api-url', process.env.REACT_APP_API_URL);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
