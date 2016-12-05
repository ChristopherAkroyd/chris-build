const gulp = require('gulp');
const connect = require('gulp-connect');
const lGet = require('lodash.get');
const path = require('path');
const sequence = require('gulp-sequence');

const getTasks = require('./src/util/getTasks.js');

const TASKS_PATH = path.resolve('src/tasks');
const taskList = [];

function loadTasks(tasks, gulpConfig) {
  tasks.forEach((task) => {
    const opts = {
      src: task.srcKey ? lGet(task.srcKey, gulpConfig) : '',
      dist: gulpConfig.dist ? gulpConfig.dist : 'dist',
      debug: gulpConfig.debug,
      connect,
    };
    gulp.task(task.taskName, () => task.task(opts));
    if (task.watch) {
      gulp.watch(opts.src, [task.taskName]);
    }
    taskList.push(task.taskName);
  });
}

function loadBuild(gulpConfig) {
  console.log(path.join(__dirname, TASKS_PATH));

  getTasks(TASKS_PATH).then((tasks) => {
    loadTasks(tasks, gulpConfig);
    gulp.task('default', sequence(taskList));
  });
  gulp.task('default', sequence(taskList));
}

loadBuild();

module.exports = loadBuild;
