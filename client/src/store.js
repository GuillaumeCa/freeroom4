import { applyMiddleware, createStore, compose } from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducer from './state';

const middleware = applyMiddleware(promise(), thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer, /* preloadedState, */
  composeEnhancers(middleware)
);
