const shell = require('./shell');
const git = require('./git');

/**
 * exec - Execute git-pick
 *
 * @param {string} commit   SHA-1 object name
 * @param {Object} branches Array with branch names
 *
 * @returns {void}
 */
function exec(commit, branches) {
  // If git is not available, then stop the run
  if (!git.isAvailable()) {
    shell.stop('git-pick requires git');
  }

  // If the commit is not available, then stop the run
  if (!git.isCommitAvailable(commit)) {
    shell.stop('Commit does not exist');
  }

  // If the working directory not clean, then stop the run
  if (!git.isWorkingDirectoryClean()) {
    shell.stop('Working directory is not clean');
  }

  // Swtich to the root directory of the repository
  shell.cd(git.getRootDirectoryPath());

  // Cache the current branch name
  const initialBranch = git.getCurrentBranch();

  // Each branch ...
  branches.forEach((branch) => {
    // Checkout the branch
    git.checkout(branch);

    // If the commit not mergeable
    if (!git.isCommitMergeable(commit)) {
      // Print a fail message and continue with the next branch
      shell.fail(`Commit is not mergeable into ${branch}`);
      return;
    }

    // Cherry pick the commit
    git.cherryPick(commit);

    // Push the changes to the remote repository
    git.push();

    // Print a success message
    shell.succeed(`Commit successfully merged into ${branch}`);
  });

  // Switch to the initial branch
  git.checkout(initialBranch);
}

module.exports = exec;
