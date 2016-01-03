import del  from 'del';
import gulp from 'gulp';

import config from '../gulp.config.js';

// Cleans out the dist folder
gulp.task('clean', done => {
  del(config.paths.dist.root)
    .then(function() {
      done();
    });
});
