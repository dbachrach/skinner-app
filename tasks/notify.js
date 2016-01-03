import gulp     from 'gulp';
import notifier from 'node-notifier';

import config from '../gulp.config.js';

export const notify = () => {
  notifier.notify({
    title: 'react-starter Build Succesful',
    message: 'High Five! ✋\nGo to localhost:8000'
  });
};

gulp.task('notify', done => {
  notify();
  done();
});
