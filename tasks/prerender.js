import gulp from 'gulp';

import config from '../gulp.config.js';

gulp.task('prerender', done => {
  const prerender = require('../src/host/prerender.js').default;
  prerender(config.paths.dist.root)
    .then(done)
    .catch(done);
});
