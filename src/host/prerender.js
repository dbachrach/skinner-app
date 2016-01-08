import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'fs-promise';
import { resolve, join } from 'path';
import serialize from 'serialize-javascript';
import { reduxReactRouter, match } from 'redux-router/server';

import configureStore from '../store/configure-store.js';
import createMemoryHistory from 'history/lib/createMemoryHistory';

import { createHost } from './host.jsx';
import { initialStateName } from './constants.js';

const routeStore = (store, url) => {
  return new Promise((pResolve, pReject) => {
    store.dispatch(match(url, (error, redirectLocation, routerState) => {
      if (error) {
        console.error('Router error:', error);
        pReject(error);
      }
      else if (!routerState) {
        console.error('Router no state');
        pReject(new Error('No Router state'));
      }
      else {
        pResolve();
      }
    }));
  });
};

const prerenderPage = (url, outPage, runActions) => {
  const store = configureStore(createMemoryHistory, reduxReactRouter);

  return routeStore(store, url)
    .then(() => {
      if (runActions) {
        return runActions(store);
      }
    })
    .then(() => {
      return readFile(resolve(__dirname, 'index.html'), 'utf-8');
    })
    .then(html => {
      const host = createHost(store);
      const indexRender = renderToString(host);

      const initialState = serialize(store.getState());
      const initialStateScript = `<script>window.${initialStateName} = ${initialState};</script>`;

      const finalHtml = html
        .replace('<!-- PRERENDER:MOUNT -->', indexRender)
        .replace('<!-- PRERENDER:STATE -->', initialStateScript);

      return writeFile(outPage, finalHtml);
    });
};

export default (outDir) => {
  return prerenderPage('/', join(outDir, 'index.html'), store => {
    return prerenderPage('/privacy', join(outDir, 'privacy.html'));
  });
};
