import util from 'gulp-util';

export default {
  production: !!util.env.production,
  paths: {
    build: {
      glob: [
        'gulpfile.babel.js',
        'gulp.config.js'
      ]
    },
    html: 'src/host/index.html',
    content: {
      assets: 'src/assets/**/*.*',
      statics: 'static/**/*.*'
    },
    src: {
      glob: [
        'src/**/*.js',
        'src/**/*.jsx'
      ],
      entrypoint: 'src/host/client.js'
    },
    sass: {
      glob: [
        'src/styles/**/*.scss'
      ],
      entrypoint: 'src/styles/main.scss'
    },
    test: {
      glob: [
        'src/**/*.test.js'
      ]
    },
    dist: {
      sourcemap: 'dist/src/script.map',
      root: 'dist',
      src: 'dist/src',
      exitpoint: 'bundle.js',
      assets: 'dist/assets',
      glob: 'dist/**/*.*'
    }
  }
};
