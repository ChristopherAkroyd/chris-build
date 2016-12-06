const gulp = require('gulp');

const BUILD_IMAGES_TASK_NAME = 'build.images';

function buildImages(opts) {
  return gulp.src(opts.build.images)
    .pipe(gulp.dest(opts.dist));
}

function task(opts) {
  gulp.task(BUILD_IMAGES_TASK_NAME, () => buildImages(opts));
}

module.exports = { name: BUILD_IMAGES_TASK_NAME, task };
