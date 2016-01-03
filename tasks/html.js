import gulp        from 'gulp';
import rename      from 'gulp-rename';
import runSequence from 'run-sequence';

import config from '../gulp.config.js';

// Copies html
gulp.task('html', () => {
  return gulp.src(config.paths.html)
    .pipe(rename('200.html'))
    .pipe(gulp.dest(config.paths.dist.root));
});

// Rebuilds html and notifies when complete.
gulp.task('rebuild:html', done => {
  runSequence(
    'html',
    'notify',
    done
  );
});

// Watches html files for changes and rebuilds them.
gulp.task('watch:html', () => {
  return gulp.watch([config.paths.html], ['rebuild:html']);
});
