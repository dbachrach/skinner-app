import gulp        from 'gulp';
import runSequence from 'run-sequence';

import config from '../gulp.config.js';

// Copies statics
gulp.task('statics', () => {
  return gulp.src(config.paths.content.statics)
    .pipe(gulp.dest(config.paths.dist.root));
});

// Rebuilds statics and notifies when complete.
gulp.task('rebuild:statics', done => {
  runSequence(
    'statics',
    'notify',
    done
  );
});

// Watches statics files for changes and rebuilds them.
gulp.task('watch:statics', () => {
  return gulp.watch([config.paths.content.statics], ['rebuild:statics']);
});
