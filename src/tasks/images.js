const gulp = require('gulp');

function buildImages(opts) {
  return gulp.src(opts.src)
    .pipe(gulp.dest(opts.dist));
}

module.exports = {
  taskName: 'build.images',
  task: buildImages,
  watch: true,
  srcKey: 'build.images',
};
