#!/usr/bin/env node
const program = require('commander');
const gitPick = require('../lib');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('git-pick')
  .arguments('<commit> <branches...>')
  .action((commit, branches) => {
    // Execute git-pick with the given commmit and branches
    gitPick(commit, branches);
  })
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
