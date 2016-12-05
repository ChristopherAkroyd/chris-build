const fsp = require('fs-promise');
const path = require('path');

function getAllTasks(tasksFilepath) {
  return fsp.readdir(tasksFilepath)
    .then((paths) => {
      const tasks = [];
      paths.forEach((task) => {
        tasks.push(require(path.join(tasksFilepath, task)));
      });

      return tasks;
    }).catch((error) => {
      console.log(error);
    });
}

module.exports = getAllTasks;
