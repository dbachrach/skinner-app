import mapValues              from 'lodash.mapvalues';
import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import Storage                from 'redux-storage';

// We need to support directory-based require in both browserify
// and node.
// Here we try to use require-globify.
// If that fails, we fallback to require-dir.
let allModules;
try {
  allModules = require('../modules/*.js', { mode: 'hash' });
}
catch (e) {
  allModules = require('require-dir')('../modules');
}

const allReducers = mapValues(allModules, 'reducer');

allReducers.router = routerStateReducer;

// Combine all those reducers into one reducer
// wrap the main reducer in a storage reducer for saving and loading data.
export default Storage.reducer(combineReducers(allReducers));
