const inquirer = require('inquirer');
const choicesMap = require('../config/choicesMap')

async function chooseTemplate() {
  const promptList = [
    {
      type: 'list',
      name: 'template',
      message: 'please select a template',
      choices: choicesMap
    }
  ];

  const { template } = await inquirer.prompt(promptList[0])
  return template
}

module.exports = {
  chooseTemplate
}
