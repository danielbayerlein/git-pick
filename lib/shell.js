const shelljs = require('shelljs');
const logSymbols = require('log-symbols');

/**
 * cd - Changes to the given directory
 *
 * @param {string} path Path to which you want to change
 *
 * @returns {void}
 */
function cd(path) {
  shelljs.cd(path);
}

/**
 * fail - Prints warning message to stdout
 *
 * @param {string} message Message to be output
 *
 * @returns {void}
 */
function fail(message) {
  shelljs.echo(`${logSymbols.warning} ${message}`);
}

/**
 * exec - Executes the given command synchronously
 *
 * @param {string} command Shell command to run
 *
 * @returns {Object} Object with code, stdout and stderr
 */
function exec(command) {
  const result = shelljs.exec(command, { silent: true });

  return {
    code: result.code,
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim(),
  };
}

/**
 * isCommandAvailable - Checks if the given command is available
 *
 * @param {string} command Shell command to run
 *
 * @returns {Boolean} true if the shell command is available, otherwise false
 */
function isCommandAvailable(command) {
  return !!shelljs.which(command);
}

/**
 * stop - Prints stop message to stdout and exits the current process
 *
 * @param {string} message Message to be output
 *
 * @returns {void}
 */
function stop(message) {
  shelljs.echo(`${logSymbols.error} ${message}`);
  shelljs.exit(1);
}

/**
 * succeed - Prints succeed message to stdout
 *
 * @param {string} message Message to be output
 *
 * @returns {void}
 */
function succeed(message) {
  shelljs.echo(`${logSymbols.success} ${message}`);
}

module.exports = {
  cd,
  fail,
  exec,
  isCommandAvailable,
  stop,
  succeed,
};
