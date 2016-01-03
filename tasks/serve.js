import gulp   from 'gulp';
import server from 'gulp-server-livereload';

import config from '../gulp.config.js';

// Serve
gulp.task('serve', () => {
  return gulp.src(config.paths.dist.root)
    .pipe(server({
      fallback: '200.html',
      host: '0.0.0.0',
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          // Don't live reload on changes to .DS_Store files
          cb(!(/.DS_Store/.test(filePath)));
        }
      }
    }));
});
