import gulp        from 'gulp';
import runSequence from 'run-sequence';

import config from '../gulp.config.js';

// Copies assets
gulp.task('assets', () => {
  return gulp.src(config.paths.content.assets)
    .pipe(gulp.dest(config.paths.dist.assets));
});

// Rebuilds assets and notifies when complete.
gulp.task('rebuild:assets', done => {
  runSequence(
    'assets',
    'notify',
    done
  );
});

// Watches assets files for changes and rebuilds them.
gulp.task('watch:assets', () => {
  return gulp.watch([config.paths.content.assets], ['rebuild:assets']);
});
