const gulp = require('gulp');

const CONNECT_TASK_NAME = 'connect';

function connect(opts) {
  return opts.connect.server({
    root: opts.dist,
    port: 8000,
    livereload: true,
  });
}

function task(opts) {
  gulp.task(CONNECT_TASK_NAME, () => connect(opts));
}

module.exports = { name: CONNECT_TASK_NAME, task };
