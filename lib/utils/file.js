const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const log = require('./log')

const ejsCompile = (tempaltePath, data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(tempaltePath, {data}, options, (err, result) => {
      if (err) {
        reject(err);
        return
      }
      resolve(result);
    })
  })
}

const writeFile = (path, content) => {
  if (fs.existsSync(path)) {
    log.error("the file already exists")
    return
  }
  return fs.promises.writeFile(path, content)
}

const mkdirSync = dirname => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

module.exports = {
  ejsCompile,
  writeFile,
  mkdirSync
}
