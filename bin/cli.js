#!/usr/bin/env node
const program = require('commander');
const updateNotifier = require('update-notifier');
const gitPick = require('../lib');
const pkg = require('../package.json');

// notify on new version
updateNotifier({ pkg }).notify({ defer: false });

program
  .version(pkg.version)
  .arguments('<commit> <branches...>')
  .action((commit, branches) => {
    // Execute git-pick with the given commmit and branches
    gitPick(commit, branches);
  })
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
