const gulp = require('gulp');

function buildHtml(opts) {
  return gulp.src(opts.src)
    .pipe(gulp.dest(opts.dist))
    .pipe(opts.connect.reload());
}

module.exports = {
  taskName: 'build.html',
  task: buildHtml,
  watch: true,
  srcKey: 'build.html',
};
