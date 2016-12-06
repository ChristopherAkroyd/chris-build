const gulp = require('gulp');

const HTML_TASK_NAME = 'build.task';

function buildHtml(opts) {
  return gulp.src(opts.build.html)
    .pipe(gulp.dest(opts.dist))
    .pipe(opts.connect.reload());
}

function task(opts) {
  gulp.task(HTML_TASK_NAME, () => buildHtml(opts));
  gulp.watch(opts.src, [HTML_TASK_NAME]);
}

module.exports = { name: HTML_TASK_NAME, task };
