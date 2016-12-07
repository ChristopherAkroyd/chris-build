const gulp = require('gulp');
const gUtil = require('gulp-util');
const browserify = require('browserify');
const sassify = require('sassify');
const source = require('vinyl-source-stream');
const path = require('path');
const watchify = require('watchify');

const BROWSERIFY_TASK_NAME = 'build.browserify';

function babelifyTransform(bundleDef) {
  bundleDef.transform('babelify', { presets: ['es2015', 'react'] });
}

function uglifyifyTransform(bundleDef) {
  bundleDef.transform({ global: true }, 'uglifyify');
}

function sassifyTransform(bundleDef) {
  bundleDef.transform(sassify, {
    'auto-inject': true,
    base64Encode: false,
    sourceMap: true,
  });
}

function bundleTask(bundleDef, opts) {
  const bundle = bundleDef.bundle();
  gUtil.log('Building ...');
  return bundle.pipe(source('bundle.js'))
    .pipe(gulp.dest(opts.dist))
    .pipe(opts.connect.reload());
}

function buildBrowserify(opts) {
  const bundle = browserify({
    debug: opts.debug,
    entries: path.join(process.cwd(), opts.build.browserify),
    extensions: ['.jsx', '.js'],
    cache: {},
    packageCache: {},
    fullPaths: true,
    plugin: [watchify],
  });

  babelifyTransform(bundle);
  sassifyTransform(bundle);
  // if we're not debugging, uglify all code.
  if (!opts.debug) {
    uglifyifyTransform(bundle);
  }

  bundle.on('error', (error) => {
    gUtil.log(error);
    this.emit('end');
  });
  bundle.on('update', () => bundleTask(bundle, opts));
  return bundleTask(bundle, opts);
}

function task(opts) {
  gulp.task(BROWSERIFY_TASK_NAME, () => buildBrowserify(opts));
}

module.exports = { name: BROWSERIFY_TASK_NAME, task };
