import React from 'react';
import { render } from 'react-dom';
import { reduxReactRouter } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { storageLoad, storageMiddleware } from '../storage/storage.js';

import configureStore from '../store/configure-store.js';

import { createHost } from './host.jsx';
import { initialStateName } from './constants.js';

const initialState = window[initialStateName];

const store = configureStore(createBrowserHistory, reduxReactRouter, storageMiddleware, initialState);

// Load saved state from Storage
storageLoad(store)
  .then(() => {
    const host = createHost(store);
    render(host, document.getElementById('root'));
  });
