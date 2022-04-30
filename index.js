#!/usr/bin/env node
const program = require('commander')

const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

const log = require('./lib/utils/log')

// 显示版本号
program.version(require('./package.json').version)

helpOptions()

createCommands()

// 解析终端指令
program.parse(process.argv)
