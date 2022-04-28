const { promisify } = require('util')
const path = require('path')
const fs = require('fs')
const program = require('commander')
const downloadRepo = promisify(require('download-git-repo'))
const open = require('open')

const log = require('../utils/log')
const terminal = require('../utils/terminal')
const { ejsCompile, writeFile, mkdirSync } = require('../utils/file')
const repoConfig = require('../config/repo_config')

const createProject = async (project, otherArgs) => {
  log.hint('sixknow helps you create your project, please wait a moment~~')

  await downloadRepo(repoConfig.vueGitRepo, project, { clone: true })

  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await terminal.spawn(npm, ['install'], { cwd: `./${project}`})

  open('http://localhost:8080')

  await terminal.spawn(npm, ['run', 'serve'], { cwd: `./${project}`})
}

const handleEjsToFile = async (name, dest, template, filename) => {
  const templatePath = path.resolve(__dirname, template)
  const result = await ejsCompile(templatePath, { name, lowerName: name.toLowerCase()})

  mkdirSync(dest)
  const targetPath = path.resolve(dest, filename)
  writeFile(targetPath, result)
}

const addComponent = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/component.vue.ejs')
}

const addPage = async (name, dest) => {
  addComponent(name, dest);
  handleEjsToFile(name, dest, '../template/vue-router.js.ejs')
}

const addStore = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/vue-store.js.ejs')
}

module.exports = {
  createProject,
  addComponent,
  addPage,
  addStore
}
