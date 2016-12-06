const gulp = require('gulp');
const connect = require('gulp-connect');
const sequence = require('gulp-sequence');

const html = require('./src/tasks/html.js');
const connectTsk = require('./src/tasks/connect.js');
const bldBrowserify = require('./src/tasks/build.browserify.js');
const images = require('./src/tasks/images.js');

const tasks = [html, bldBrowserify, images, connectTsk];

function loadTasks(config) {
  const taskList = [];
  tasks.forEach((task) => {
    const opts = Object.assign(config, { connect });
    gulp.task(task.name, () => task.task(opts));
    taskList.push(task.name);
  });
  return taskList;
}

function startGulp(config) {
  const taskList = loadTasks(config);
  gulp.task('default', sequence(taskList));
}

module.exports = startGulp;
