import gulp   from 'gulp';
import eslint from 'gulp-eslint';

import config from '../gulp.config.js';

// Lints code for errors
gulp.task('lint', () => {
  const paths = config.paths.src.glob.concat(config.paths.build.glob);
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

// Watches source files for changes and lints them
gulp.task('watch:lint', () => {
  return gulp.watch([config.paths.src.glob], ['lint']);
});
