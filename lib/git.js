const shell = require('./shell');

/**
 * checkout - Switch to the given branch name
 *
 * @param {string}  branch    Branch name
 * @param {Boolean} newBranch Create a new branch
 *
 * @return {void}
 */
function checkout(branch, newBranch = false) {
  shell.exec(`git checkout ${newBranch ? '-b ' : ''}${branch}`);
}

/**
 * cherryPick - Cherry pick the given commit
 *
 * @param {string} commit SHA-1 object name
 *
 * @return {void}
 */
function cherryPick(commit) {
  shell.exec(`git cherry-pick ${commit}`);
}

/**
 * fetch - Update remote tracking branches
 * (refs/remote/<remote>)
 *
 * @return {void}
 */
function fetch() {
  shell.exec('git fetch');
}

/**
 * getCurrentBranch - Get the current branch
 *
 * @return {string} Name of the branch
 */
function getCurrentBranch() {
  return shell.exec('git rev-parse --abbrev-ref HEAD').stdout;
}

/**
 * getRootDirectoryPath - Get the root directory of the repository
 *
 * @return {string} Root directory
 */
function getRootDirectoryPath() {
  return shell.exec('git rev-parse --show-toplevel').stdout;
}

/**
 * isAvailable - Checks if git is available
 *
 * @return {Boolean} true if git is available, otherwise false
 */
function isAvailable() {
  return shell.isCommandAvailable('git');
}

/**
 * isCommitAvailable - Checks if the given commit available
 *
 * @param {string} commit SHA-1 object name
 *
 * @return {Boolean} true if the commit exists, otherwise false
 */
function isCommitAvailable(commit) {
  return shell.exec(`git cat-file -t ${commit}`).stdout === 'commit';
}

/**
 * isCommitMergeable - Checks if the given commit mergeable
 *
 * @param {string} commit SHA-1 object name
 *
 * @return {Boolean} true if the commit is mergeable, otherwise false
 */
function isCommitMergeable(commit) {
  return !shell.exec(`git format-patch -1 ${commit} --stdout | git apply --check --whitespace=nowarn --ignore-whitespace -`).stderr;
}

/**
 * isWorkingDirectoryClean - Checks if the working directory clean
 *
 * @return {Boolean} true if the working directory is clean, otherwise false
 */
function isWorkingDirectoryClean() {
  return !shell.exec('git status --porcelain').stdout;
}

/**
 * push - Push the changes to the remote repository
 *
 * @return {void}
 */
function push() {
  shell.exec('git push');
}

/**
 * pull - Bring local branch up-to-date with remote one
 *
 * @return {void}
 */
function pull() {
  shell.exec('git pull');
}

/**
 * setUpstreamBranch - Sets the remote branch
 * @param  {string} branch Branch name
 * @return {void}
 */
function setUpstreamBranch(branch) {
  shell.exec(`git branch -u origin/${branch}`);
}

module.exports = {
  checkout,
  cherryPick,
  fetch,
  getCurrentBranch,
  getRootDirectoryPath,
  isAvailable,
  isCommitAvailable,
  isCommitMergeable,
  isWorkingDirectoryClean,
  push,
  pull,
  setUpstreamBranch,
};
