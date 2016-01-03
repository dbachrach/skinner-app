import storage      from 'redux-storage';
import createEngine from 'redux-storage/engines/localStorage';

let engine = storage.decorators.filter(createEngine('upnext-save-key'), [
  // These keys will be stored to local storage
]);

// Debounce saves to every 1.5 seconds
engine = storage.decorators.debounce(engine, 1500);

export const storageMiddleware = storage.createMiddleware(engine);

export const storageLoad = storage.createLoader(engine);
