function connect(opts) {
  return opts.connect.server({
    root: opts.dist,
    port: 8000,
    livereload: true,
  });
}

module.exports = {
  taskName: 'connect',
  task: connect,
};
