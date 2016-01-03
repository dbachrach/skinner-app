import gulp from 'gulp';
import surge from 'gulp-surge';

import config from '../gulp.config.js';

// Cleans out the dist folder
gulp.task('deploy', done => {
  return surge({
    project: config.paths.dist.root,
    domain: 'react-starter.surge.sh'
  });
});


