const chalk = require('chalk')

const hint = (...info) => {
  console.log(chalk.blue(info));
}

const error = (...info) => {
  console.log(chalk.red(info))
}

const rgb = (...info) => {
  console.log(chalk.rgb(69, 39, 160)(info));
}

const bgRgb = (...info) => {
  console.log(chalk.bgRgb(69, 39, 160)(info));
}

const green = (...info) => {
  console.log(chalk.green(info));
}

const clear = () => {
  console.clear();
}

module.exports = {
  hint,
  error,
  rgb,
  bgRgb,
  green,
  clear
}
