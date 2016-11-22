const shell = require('./shell');

/**
 * checkout - Switch to the given branch name
 *
 * @param {string} branch Branch name
 *
 * @returns {void}
 */
function checkout(branch) {
  shell.exec('git fetch');
  shell.exec(`git checkout ${branch}`);
}

/**
 * cherryPick - Cherry pick the given commit
 *
 * @param {type} commit SHA-1 object name
 *
 * @returns {void}
 */
function cherryPick(commit) {
  shell.exec(`git cherry-pick ${commit}`);
}

/**
 * getCurrentBranch - Get the current branch
 *
 * @returns {string} Name of the branch
 */
function getCurrentBranch() {
  return shell.exec('git rev-parse --abbrev-ref HEAD').stdout;
}

/**
 * getRootDirectoryPath - Get the root directory of the repository
 *
 * @returns {string} Root directory
 */
function getRootDirectoryPath() {
  return shell.exec('git rev-parse --show-toplevel').stdout;
}

/**
 * isAvailable - Checks if git is available
 *
 * @returns {Boolean} true if git is available, otherwise false
 */
function isAvailable() {
  return shell.isCommandAvailable('git');
}

/**
 * isCommitAvailable - Checks if the given commit available
 *
 * @param {string} commit SHA-1 object name
 *
 * @returns {Boolean} true if the commit exists, otherwise false
 */
function isCommitAvailable(commit) {
  return shell.exec(`git cat-file -t ${commit}`).stdout === 'commit';
}

/**
 * isCommitMergeable - Checks if the given commit mergeable
 *
 * @param {string} commit SHA-1 object name
 *
 * @returns {Boolean} true if the commit is mergeable, otherwise false
 */
function isCommitMergeable(commit) {
  return !shell.exec(`git format-patch -1 ${commit} --stdout | git apply --check --whitespace=nowarn -`).stderr;
}

/**
 * isWorkingDirectoryClean - Checks if the working directory clean
 *
 * @returns {Boolean} true if the working directory is clean, otherwise false
 */
function isWorkingDirectoryClean() {
  return !shell.exec('git status --porcelain').stdout;
}

/**
 * push - Push the changes to the remote repository
 *
 * @returns {void}
 */
function push() {
  shell.exec('git push');
}

module.exports = {
  checkout,
  cherryPick,
  getCurrentBranch,
  getRootDirectoryPath,
  isAvailable,
  isCommitAvailable,
  isCommitMergeable,
  isWorkingDirectoryClean,
  push,
};
