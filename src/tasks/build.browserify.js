const gulp = require('gulp');
const gUtil = require('gulp-util');
const browserify = require('browserify');
const sassify = require('sassify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');

function buildBrowserify(opts) {
  const bundle = browserify({
    debug: opts.debug,
    entries: opts.src,
    extensions: ['.jsx', '.js'],
    cache: {},
    packageCache: {},
    fullPaths: true,
    plugin: [watchify],
  });

  function rebundle() {
    const bundleTask = bundle.bundle();
    bundleTask.on('error', (error) => {
      gUtil.log(error);
      this.emit('end');
    });
    gUtil.log('Building ...');
    return bundleTask.pipe(source('bundle.js'))
      .pipe(gulp.dest(opts.dist))
      .pipe(opts.connect.reload());
  }

  bundle.transform('babelify', { presets: ['es2015', 'react'] });
  bundle.transform(sassify, {
    'auto-inject': true,
    base64Encode: false,
    sourceMap: true,
  });
  bundle.on('update', rebundle);
  return rebundle();
}

module.exports = {
  taskName: 'build.browserify',
  task: buildBrowserify,
  srcKey: 'build.browserifyEntry',
};
