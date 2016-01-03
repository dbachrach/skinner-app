import { compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware                           from 'redux-thunk';

import rootReducer from '../reducer/root-reducer.js';
import routes from '../routes/routes.jsx';

export default (createHistory, reduxReactRouter, storageMiddleware, initialState) => {
  let createStorePrefix;

  const middlewares = [
    thunkMiddleware
  ];

  if (storageMiddleware) {
    middlewares.push(storageMiddleware);
  }

  if (process.env.NODE_ENV === 'development') {
    const DevTools = require('../components/dev-tools.jsx').Tools;

    createStorePrefix = compose(
      applyMiddleware(...middlewares),
      reduxReactRouter({
        routes,
        createHistory
      }),
      DevTools.instrument(),
    );
  }
  else {
    createStorePrefix = compose(
      applyMiddleware(...middlewares),
      reduxReactRouter({
        routes,
        createHistory
      }),
    );
  }

  return createStorePrefix(createStore)(rootReducer, initialState);
};
