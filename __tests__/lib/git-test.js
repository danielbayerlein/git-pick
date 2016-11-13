const git = require('../../lib/git');
const shell = require('../../lib/shell');

describe('git.js', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('function checkout()', () => {
    beforeEach(() => {
      shell.exec = jest.fn();
      git.checkout('master');
    });

    it('to be called shell.exec with "git fetch"', () => {
      expect(shell.exec).toBeCalledWith('git fetch');
    });

    it('to be called shell.exec with "git checkout master"', () => {
      expect(shell.exec).toBeCalledWith('git checkout master');
    });
  });

  describe('function cherryPick()', () => {
    it('to be called shell.exec with "git cherry-pick abc1234"', () => {
      shell.exec = jest.fn();
      git.cherryPick('abc1234');
      expect(shell.exec).toBeCalledWith('git cherry-pick abc1234');
    });
  });

  describe('function getCurrentBranch()', () => {
    beforeEach(() => {
      shell.exec = jest.fn();
    });

    it('to be called shell.exec with "git rev-parse --abbrev-ref HEAD"', () => {
      git.getCurrentBranch();
      expect(shell.exec).toBeCalledWith('git rev-parse --abbrev-ref HEAD');
    });

    it('returns current branch name', () => {
      shell.exec.mockReturnValue('master');
      expect(git.getCurrentBranch()).toBe('master');
    });
  });

  describe('function getRootDirectoryPath()', () => {
    beforeEach(() => {
      shell.exec = jest.fn();
    });

    it('to be called shell.exec with "git rev-parse --show-toplevel"', () => {
      git.getRootDirectoryPath();
      expect(shell.exec).toBeCalledWith('git rev-parse --show-toplevel');
    });

    it('returns root directory path of the repository', () => {
      shell.exec.mockReturnValue('/Users/Daniel/Projects/git-pick');
      expect(git.getRootDirectoryPath()).toBe('/Users/Daniel/Projects/git-pick');
    });
  });

  describe('function isAvailable()', () => {
    beforeEach(() => {
      shell.isCommandAvailable = jest.fn();
    });

    it('to be called shell.isCommandAvailable with "git"', () => {
      git.isAvailable();
      expect(shell.isCommandAvailable).toBeCalledWith('git');
    });

    it('returns true if git is available', () => {
      shell.isCommandAvailable.mockReturnValue(true);
      expect(git.isAvailable()).toBeTruthy();
    });

    it('returns false if git is not available', () => {
      shell.isCommandAvailable.mockReturnValue(false);
      expect(git.isAvailable()).toBeFalsy();
    });
  });

  describe('function isCommitAvailable()', () => {
    beforeEach(() => {
      shell.exec = jest.fn();
    });

    it('to be called shell.exec with "git cat-file -t abc1234"', () => {
      git.isCommitAvailable('abc1234');
      expect(shell.exec).toBeCalledWith('git cat-file -t abc1234');
    });

    it('returns true if commit is available', () => {
      shell.exec.mockReturnValue('commit');
      expect(git.isCommitAvailable('abc1234')).toBeTruthy();
    });

    it('returns false if commit is not available', () => {
      shell.exec.mockReturnValue('');
      expect(git.isCommitAvailable('abc1234')).toBeFalsy();
    });
  });

  describe('function isCommitMergeable()', () => {
    beforeEach(() => {
      shell.exec = jest.fn();
    });

    it('to be called shell.exec with "git format-patch -1 abc1234 --stdout | git apply --check -"', () => {
      git.isCommitMergeable('abc1234');
      expect(shell.exec).toBeCalledWith('git format-patch -1 abc1234 --stdout | git apply --check -');
    });

    it('returns true if commit is mergeable', () => {
      shell.exec.mockReturnValue('');
      expect(git.isCommitMergeable('abc1234')).toBeTruthy();
    });

    it('returns false if commit is not mergeable', () => {
      shell.exec.mockReturnValue('fatal: unrecognized input');
      expect(git.isCommitMergeable('abc1234')).toBeFalsy();
    });
  });

  describe('function isWorkingDirectoryClean()', () => {
    beforeEach(() => {
      shell.exec = jest.fn();
    });

    it('to be called shell.exec with "git status --porcelain"', () => {
      git.isWorkingDirectoryClean();
      expect(shell.exec).toBeCalledWith('git status --porcelain');
    });

    it('returns true if working directory is clean', () => {
      shell.exec.mockReturnValue('');
      expect(git.isWorkingDirectoryClean()).toBeTruthy();
    });

    it('returns false if working directory is not clean', () => {
      shell.exec.mockReturnValue('M package.json');
      expect(git.isWorkingDirectoryClean()).toBeFalsy();
    });
  });

  describe('function push()', () => {
    it('to be called shell.exec with "git push"', () => {
      shell.exec = jest.fn();
      git.push();
      expect(shell.exec).toBeCalledWith('git push');
    });
  });
});
