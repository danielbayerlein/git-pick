#!/usr/bin/env node
const program = require('commander')
const updateNotifier = require('update-notifier')
const gitPick = require('../lib')
const pkg = require('../package.json')

// Notify on new version
updateNotifier({ pkg }).notify({ defer: false })

program
  .version(pkg.version)
  .option('-b, --new-branch', 'Creates a new feature branch for each given branch')
  .option('-p, --pull', 'Fetches the changes from the remote branch, before cherry-pick the commit')
  .arguments('<commit> <branches...>')
  .action((commit, branches, options) => {
    // Execute git-pick with the given commmit and branches
    gitPick(commit, branches, options)
  })
  .parse(process.argv)

if (!program.args.length) {
  program.help()
}
