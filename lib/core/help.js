const program = require('commander')

const helpOptions = () => {
  program.option('-w', 'a sixknow option')

  program.option('-s --src <src>', 'a source folder')
  program.option('-d --dest <dest>', 'a destination folder')
  program.option('-f --framework <framework>', 'a framework name')

  program.on('--help', function () {
    console.log("");
    console.log("usage");
    console.log("  sixknow -v");
    console.log("  sixknow -version");
  })
}

module.exports = helpOptions;
