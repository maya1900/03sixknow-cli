const program = require('commander')

const {
  createProject,
  addComponent,
  addPage,
  addStore
} = require('./actions')
const { chooseTemplate } = require('./inquires')

const log = require('../utils/log')

const createCommands = () => {
  log.hint('Hello, Welcome to use sixknow-cli ~~')
  program
    .command('create <projectName>')
    .description('create a project template')
    .option("-T, --template [template]", "输入模板名字")
    .action(async function (projectName, options) {
      let template = options.template
      projectName = projectName || 'untitled'
      if (!template) {
        template = await chooseTemplate()
      }
      log.rgb(`you select a template is ${template}`)

      await createProject(template, projectName)
    })

  program
    .command('addcpn <name>')
    .description('add a vue component, e.p sk addcpn Nav [-d dest]')
    .action(name => addComponent(name, program.dest || `src/components`))

  program
    .command('addpage <name>')
    .description('add  a vue page, e.p. sk addpage Home [-d dest]')
    .action(name => {
      addPage(name, program.dest || `src/views/${name.toLowerCase()}`)
    })

  program
    .command('addstore <name>')
    .description('add a vue store, e.p. sk addstore Hot [-d dest]')
    .action(name => addStore(name, program.dest || `src/store/modules/${name.toLowerCase()}`))
}

module.exports = createCommands;
