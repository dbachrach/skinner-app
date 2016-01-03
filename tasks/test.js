import gulp  from 'gulp';
import mocha from 'gulp-mocha';

import config from '../gulp.config.js';

gulp.task('test', () => {
  return gulp.src(config.paths.test.glob, { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});
