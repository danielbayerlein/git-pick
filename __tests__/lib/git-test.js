const git = require('../../lib/git');
const shell = require('../../lib/shell');

describe('git.js', () => {
  beforeEach(() => {
    shell.exec = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('function checkout()', () => {
    test('calls shell.exec with "git checkout master"', () => {
      git.checkout('master');
      expect(shell.exec).toBeCalledWith('git checkout master');
    });

    test('calls shell-exec with "git checkout -b test" if new branch is true', () => {
      git.checkout('test', true);
      expect(shell.exec).toBeCalledWith('git checkout -b test');
    });
  });

  describe('function cherryPick()', () => {
    test('calls shell.exec with "git cherry-pick abc1234"', () => {
      git.cherryPick('abc1234');
      expect(shell.exec).toBeCalledWith('git cherry-pick abc1234');
    });
  });

  describe('function fetch()', () => {
    test('calls shell.exec with "git fetch"', () => {
      git.fetch();
      expect(shell.exec).toBeCalledWith('git fetch');
    });
  });

  describe('function getCurrentBranch()', () => {
    beforeEach(() => {
      shell.exec.mockImplementation(() => ({ stdout: 'master' }));
    });

    test('calls shell.exec with "git rev-parse --abbrev-ref HEAD"', () => {
      git.getCurrentBranch();
      expect(shell.exec).toBeCalledWith('git rev-parse --abbrev-ref HEAD');
    });

    test('returns current branch name', () => {
      expect(git.getCurrentBranch()).toBe('master');
    });
  });

  describe('function getRootDirectoryPath()', () => {
    beforeEach(() => {
      shell.exec.mockImplementation(() => ({ stdout: '/Users/Daniel/Projects/git-pick' }));
    });

    test('calls shell.exec with "git rev-parse --show-toplevel"', () => {
      git.getRootDirectoryPath();
      expect(shell.exec).toBeCalledWith('git rev-parse --show-toplevel');
    });

    test('returns root directory path of the repository', () => {
      expect(git.getRootDirectoryPath()).toBe('/Users/Daniel/Projects/git-pick');
    });
  });

  describe('function isAvailable()', () => {
    beforeEach(() => {
      shell.isCommandAvailable = jest.fn();
    });

    test('calls shell.isCommandAvailable with "git"', () => {
      git.isAvailable();
      expect(shell.isCommandAvailable).toBeCalledWith('git');
    });

    test('returns true if git is available', () => {
      shell.isCommandAvailable.mockReturnValue(true);
      expect(git.isAvailable()).toBeTruthy();
    });

    test('returns false if git is not available', () => {
      shell.isCommandAvailable.mockReturnValue(false);
      expect(git.isAvailable()).toBeFalsy();
    });
  });

  describe('function isCommitAvailable()', () => {
    test('calls shell.exec with "git cat-file -t abc1234"', () => {
      shell.exec.mockImplementation(() => ({ stdout: jest.fn() }));
      git.isCommitAvailable('abc1234');
      expect(shell.exec).toBeCalledWith('git cat-file -t abc1234');
    });

    test('returns true if commit is available', () => {
      shell.exec.mockImplementation(() => ({ stdout: 'commit' }));
      expect(git.isCommitAvailable('abc1234')).toBeTruthy();
    });

    test('returns false if commit is not available', () => {
      shell.exec.mockImplementation(() => ({ stdout: '' }));
      expect(git.isCommitAvailable('abc1234')).toBeFalsy();
    });
  });

  describe('function isCommitMergeable()', () => {
    test('calls shell.exec with "git format-patch -1 abc1234 --stdout | git apply --check --whitespace=nowarn --ignore-whitespace -"', () => {
      shell.exec.mockImplementation(() => ({ stderr: jest.fn() }));
      git.isCommitMergeable('abc1234');
      expect(shell.exec).toBeCalledWith('git format-patch -1 abc1234 --stdout | git apply --check --whitespace=nowarn --ignore-whitespace -');
    });

    test('returns true if commit is mergeable', () => {
      shell.exec.mockImplementation(() => ({ stderr: '' }));
      expect(git.isCommitMergeable('abc1234')).toBeTruthy();
    });

    test('returns false if commit is not mergeable', () => {
      shell.exec.mockImplementation(() => ({ stderr: 'fatal: unrecognized input' }));
      expect(git.isCommitMergeable('abc1234')).toBeFalsy();
    });
  });

  describe('function isWorkingDirectoryClean()', () => {
    test('calls shell.exec with "git status --porcelain"', () => {
      shell.exec.mockImplementation(() => ({ stdout: jest.fn() }));
      git.isWorkingDirectoryClean();
      expect(shell.exec).toBeCalledWith('git status --porcelain');
    });

    test('returns true if working directory is clean', () => {
      shell.exec.mockImplementation(() => ({ stdout: '' }));
      expect(git.isWorkingDirectoryClean()).toBeTruthy();
    });

    test('returns false if working directory is not clean', () => {
      shell.exec.mockImplementation(() => ({ stdout: 'M package.json' }));
      expect(git.isWorkingDirectoryClean()).toBeFalsy();
    });
  });

  describe('function push()', () => {
    test('calls shell.exec with "git push"', () => {
      git.push();
      expect(shell.exec).toBeCalledWith('git push');
    });
  });

  describe('function push()', () => {
    test('calls shell.exec with "git pull"', () => {
      git.pull();
      expect(shell.exec).toBeCalledWith('git pull');
    });
  });

  describe('function setUpstreamBranch', () => {
    test('calls sell.exec with "git branch -u origin/" and the given branch', () => {
      git.setUpstreamBranch('test');
      expect(shell.exec).toBeCalledWith('git branch -u origin/test');
    });
  });
});
