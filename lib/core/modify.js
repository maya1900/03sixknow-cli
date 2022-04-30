const fs = require('fs');
const path = require('path');
const log = require('../utils/log')

async function modify (projectName) {
  return new Promise((resolve, reject) => {
    log.green('\n init package.json:')
    log.green('--------------------------------\n')
    const parentPath = process.cwd()
    const projectPath = path.join(parentPath, projectName)
    const file = path.join(projectPath, 'package.json')
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        log.error(`read file failed: ${file}`)
        log.error(`error: ${err}`)
        log.error('\n--------------------------------')
        reject()
      } else {
        const res = JSON.parse(data)
        const oldName = res.name
        res.name = projectName
        fs.writeFile(file, JSON.stringify(res, null, 2), 'utf-8', err => {
          if (err) {
            log.error(`write file failed: ${file}`)
            reject()
          }
          log.green('package.json init is complete')
          log.green(`project name: ${oldName} ===== ${projectName}`)
          log.green('\n--------------------------------')
          resolve()
        })
      }
    })
  })
}

module.exports = {
  modify
}
