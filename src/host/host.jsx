import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

export const createHost = store => {
  let debugElement;

  // For dev builds, add the Redux DevTools
  if (process.env.NODE_ENV === 'development') {
    const DevTools = require('../components/dev-tools.jsx').default;
    debugElement = <DevTools />;
  }

  return (
    <Provider store={store}>
      <div>
        <ReduxRouter />
        {debugElement}
      </div>
    </Provider>
  );
};
