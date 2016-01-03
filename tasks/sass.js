import gulp        from 'gulp';
import runSequence from 'run-sequence';
import sass        from 'gulp-sass';

import config from '../gulp.config.js';

// Compiles sass code to css.
// In --production, minifies css.
gulp.task('sass', () => {
  let opts = {
    includePaths: require('node-bourbon').includePaths
  };
  if (config.production) {
    opts.outputStyle = 'compressed';
  }

  return gulp.src(config.paths.sass.entrypoint)
    .pipe(sass(opts).on('error', sass.logError))
    .pipe(gulp.dest(config.paths.dist.src));
});

// Rebuilds sass code and notifies when complete.
gulp.task('rebuild:sass', done => {
  runSequence(
    'sass',
    'notify',
    done
  );
});

// Watches sass files for changes and rebuilds them
gulp.task('watch:sass', () => {
  return gulp.watch(config.paths.sass.glob, ['rebuild:sass']);
});
