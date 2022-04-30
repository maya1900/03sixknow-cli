const path = require('path')
const downloadRepo = require('download-git-repo')
const open = require('open')
const ora = require('ora')
const log = require('../utils/log')
const { modify } = require('./modify')

const terminal = require('../utils/terminal')
const { ejsCompile, writeFile, mkdirSync } = require('../utils/file')
const repoConfig = require('../config/repo_config')

const createProject = async (template, projectName) => {
  const spinner = ora({
    text: 'template downloading...',
    color: "yellow",
    spinner: {
      interval: 80,
      frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    },
  });
  spinner.start();

  downloadRepo(repoConfig.get(template), projectName, { clone: true }, async error => {
    if (error) {
      spinner.fail('download failed')
      log.bgRgb(`create ${projectName} failed, error: ${error.message}`)
    } else {
      spinner.succeed(`download succeed: ${projectName}`)
      await modify(projectName)
      log.rgb(`Successfully created ${projectName} project, please wait for installation...`)

      const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
      await terminal.spawn(npm, ['install'], {
        cwd: `./${projectName}`
      })
      log.bgRgb('Successfully installed, please wait for the server to start...')
      await terminal.spawn(npm, ['run', 'serve'], {
        cwd: `./${projectName}`
      })

      open('http://localhost:8080')
    }
  })
}

const handleEjsToFile = async (name, dest, template, filename) => {
  const templatePath = path.resolve(__dirname, template)
  const result = await ejsCompile(templatePath, { name, lowerName: name.toLowerCase() })

  mkdirSync(dest)
  const targetPath = path.resolve(dest, filename)
  writeFile(targetPath, result)
  log.bgRgb('Successfully created')
}

const addComponent = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`)
}

const addPage = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/component.vue.ejs', `index.vue`)
  handleEjsToFile(name, 'src/router/modules', '../template/vue-router.js.ejs', `${name}.js`)
}

const addStore = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/vue-store.js.ejs', `${name}.js`)
}

module.exports = {
  createProject,
  addComponent,
  addPage,
  addStore
}
