const program = require('commander')

const {
  createProject,
  addComponent,
  addPage,
  addStore
} = require('./actions')

const createCommands = () => {
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a newly created directory')
    .action(createProject)

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
