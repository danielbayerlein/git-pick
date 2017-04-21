const shelljs = require('shelljs');
const shell = require('../../lib/shell');

jest.mock('log-symbols', () => ({
  error: '[ERROR-ICON]',
  success: '[SUCCESS-ICON]',
  warning: '[WARNING-ICON]',
}));

describe('shell.js', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('function cd()', () => {
    test('calls shelljs.cd with "Projects/git-pick"', () => {
      shelljs.cd = jest.fn();
      shell.cd('Projects/git-pick');
      expect(shelljs.cd).toBeCalledWith('Projects/git-pick');
    });
  });

  describe('function fail()', () => {
    test('calls shelljs.echo with "[WARNING-ICON] Sorry"', () => {
      shelljs.echo = jest.fn();
      shell.fail('Sorry');
      expect(shelljs.echo).toBeCalledWith('[WARNING-ICON] Sorry');
    });
  });

  describe('function exec()', () => {
    beforeEach(() => {
      shelljs.exec = jest.fn(() => ({
        stdout: 'https://git-scm.com/documentation',
        stderr: '',
      }));
    });

    test('calls shelljs.exec with "git --help"', () => {
      shell.exec('git --help');
      expect(shelljs.exec).toBeCalledWith('git --help', { silent: true });
    });

    test('returns result of given command', () => {
      expect(shell.exec('git --help').stdout).toBe('https://git-scm.com/documentation');
    });
  });

  describe('function isCommandAvailable()', () => {
    beforeEach(() => {
      shelljs.which = jest.fn();
    });

    test('calls shelljs.which with "git"', () => {
      shell.isCommandAvailable('git');
      expect(shelljs.which).toBeCalledWith('git');
    });

    test('returns true if given command is available', () => {
      shelljs.which.mockReturnValue('/usr/local/bin/git');
      expect(shell.isCommandAvailable('git')).toBeTruthy();
    });

    test('returns false if given command is not available', () => {
      shelljs.which.mockReturnValue('');
      expect(shell.isCommandAvailable('git')).toBeFalsy();
    });
  });

  describe('function stop()', () => {
    beforeEach(() => {
      shelljs.echo = jest.fn();
      shelljs.exit = jest.fn();
      shell.stop('Sorry');
    });

    test('calls shelljs.echo with "[ERROR-ICON] Sorry"', () => {
      expect(shelljs.echo).toBeCalledWith('[ERROR-ICON] Sorry');
    });

    test('calls shelljs.exit with 1"', () => {
      expect(shelljs.exit).toBeCalledWith(1);
    });
  });

  describe('function succeed()', () => {
    test('calls shelljs.echo with "[SUCCESS-ICON] Happy"', () => {
      shelljs.echo = jest.fn();
      shell.succeed('Happy');
      expect(shelljs.echo).toBeCalledWith('[SUCCESS-ICON] Happy');
    });
  });
});
