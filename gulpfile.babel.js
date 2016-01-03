// gulpfile.babel.js
import gulp        from 'gulp';
import requireDir  from 'require-dir';
import runSequence from 'run-sequence';

import config from './gulp.config.js';

// Load all gulp tasks from all files in the `tasks` directory
const tasks = requireDir('./tasks');

// Set NODE_ENV environment variables based on --flags
process.env.NODE_ENV = (config.production) ? 'production' : 'development';

// Build everything needed for the web project.
gulp.task('build', done => {
  runSequence(
    'clean',
    ['sass', 'src:nowatch', 'assets', 'statics', 'html', 'prerender'],
    'test',
    done
  );
});

// Build everything needed for the web project.
// Watches all files and rebuilds on save.
// Sets up a server at http://localhost:8000/
// Notifies when complete.
gulp.task('buildwatch', done => {
  runSequence(
    'clean',
    ['sass', 'src:watch', 'assets', 'statics', 'html', 'prerender'],
    'test',
    'watch',
    'serve',
    'notify',
    done
  );
});

// Watch everything and rebuild
gulp.task('watch', [
  'watch:sass',
  'watch:assets',
  'watch:html',
  'watch:statics',
  'watch:lint'
]);

// Default 'gulp' command will run 'buildwatch'.
gulp.task('default', ['buildwatch']);
