//////////////////////////////////////////////////
// Module Template file
//////////////////////////////////////////////////

import { createAction, handleActions } from 'redux-actions';

// ActionTypes
export const ACTION_TYPE_NAME = 'upnext/module-name/ACTION_TYPE_NAME';

// Actions
export const actionNameAction = createAction(ACTION_TYPE_NAME);


const initialState = /* initial state */;

const reducerMap = {
  [/* action type name */]: (state, action) => {
    /* state reducer */
  }
};

export const reducer = handleActions(reducerMap, initialState);
