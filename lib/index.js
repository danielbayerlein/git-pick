const shell = require('./shell')
const git = require('./git')

/**
 * exec - Execute git-pick
 *
 * @param {string} commit   SHA-1 object name
 * @param {Object} branches Array with branch names
 * @param {Object} options  Object with git-pick options
 *
 * @return {void}
 */
function exec (commit, branches, options) {
  // If git is not available, then stop the run
  if (!git.isAvailable()) {
    shell.stop('git-pick requires git')
  }

  // If the commit is not available, then stop the run
  if (!git.isCommitAvailable(commit)) {
    shell.stop('Commit does not exist')
  }

  // If the working directory not clean, then stop the run
  if (!git.isWorkingDirectoryClean()) {
    shell.stop('Working directory is not clean')
  }

  // Swtich to the root directory of the repository
  shell.cd(git.getRootDirectoryPath())

  // Cache the current branch name
  const initialBranch = git.getCurrentBranch()

  // Each branch ...
  branches.forEach((branch) => {
    // update remote tracking branches
    git.fetch()

    // Checkout the branch
    git.checkout(branch)

    // Get your branch up-to-date if called with -p (--pull)
    if (options.pull) {
      git.pull()

      // If the pull could not be automerged
      if (!git.isWorkingDirectoryClean()) {
        // Print a fail message and continue with the next branch
        shell.fail(`[${branch}] Failed to auto merge remote branch`)
        return
      }
    }

    const branchName = options.newBranch ? `${branch}_${commit}` : branch

    // Create feature branch if called with -b (--new-branch)
    if (options.newBranch) {
      git.checkout(branchName, true)
    }

    // If the commit not mergeable
    if (!git.isCommitMergeable(commit)) {
      // Print a fail message and continue with the next branch
      shell.fail(`[${branchName}] Commit is not mergeable`)
      return
    }

    // Cherry pick the commit
    git.cherryPick(commit)

    // Push the changes to the remote repository
    if (options.newBranch) {
      git.pushUpstream(branchName)
    } else {
      git.push(options.newBranch)
    }

    // Print a success message
    shell.succeed(`[${branchName}] Commit successfully merged`)
  })

  // Switch to the initial branch
  git.checkout(initialBranch)
}

module.exports = exec
