import assign         from 'lodash.assign';
import babelify       from 'babelify';
import browserify     from 'browserify';
import buffer         from 'vinyl-buffer';
import envify         from 'envify/custom';
import exorcist       from 'exorcist';
import gcallback      from 'gulp-callback';
import gulp           from 'gulp';
import gulpif         from 'gulp-if';
import requireGlobify from 'require-globify';
import source         from 'vinyl-source-stream';
import stripify       from 'stripify';
import transform      from 'vinyl-transform';
import uglify         from 'gulp-uglify';
import uglifyify      from 'uglifyify';
import util           from 'gulp-util';
import watchify       from 'watchify';
import config     from '../gulp.config.js';
import { notify } from './notify.js';

const pack = (b, outputFile) => {
  return b
    .bundle()
    .on('error', function(err) {
      util.log(util.colors.red(err.stack));
      this.emit('end');
    })
    .pipe(source(outputFile))
    .pipe(buffer())
    .pipe(gulpif(config.production, uglify()))
    .pipe(gulpif(!config.production, transform(function () { return exorcist(config.paths.dist.sourcemap); })))
    .pipe(gulp.dest(config.paths.dist.src));
};

// Builds all javascript source code
// @param watch Whether to watch source code via watchify
const buildSrc = watch => {
  let opts = {
    debug: !config.production
  };

  if (watch) {
    opts = assign(opts, watchify.args);
  }

  let b = browserify(config.paths.src.entrypoint, opts);

  if (watch) {
    b = watchify(b);
    b.on('update', () => {
      util.log(util.colors.blue('watchify'), 'Updating bundle');

      pack(b, config.paths.dist.exitpoint)
        .pipe(gcallback(notify));
    });
  }

  b = b
    .transform(babelify)
    .transform(requireGlobify)
    .transform(envify({ NODE_ENV: process.env.NODE_ENV }))
    .on('log', util.log);

  if (config.production) {
    b.transform(stripify);
    b.transform(uglifyify);
  }

  return pack(b, config.paths.dist.exitpoint);
};

// Compiles all js, and jsx and packages with browserify.
// Does not perform a watchify.
// In --production, uglifies JS.
gulp.task('src:nowatch', ['lint'], () => {
  return buildSrc(false);
});

// Compiles all js, and jsx and packages with browserify.
// Performs a watchify.
// In --production, uglifies JS.
gulp.task('src:watch', ['lint'], () => {
  return buildSrc(true);
});
