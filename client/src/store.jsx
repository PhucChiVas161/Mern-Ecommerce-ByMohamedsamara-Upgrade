import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

import createReducer from './reducers';

export const history = createHashHistory();

const middlewares = [thunk, routerMiddleware(history)];

const enhancers = [applyMiddleware(...middlewares)];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  createReducer(history),
  composeEnhancers(...enhancers)
);

if (import.meta.hot) {
  // Enable Webpack hot module replacement for reducers
  import.meta.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer(history));
  });
}

export default store;
