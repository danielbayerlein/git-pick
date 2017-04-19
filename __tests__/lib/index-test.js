const gitPick = require('../../lib/');
const git = require('../../lib/git');
const shell = require('../../lib/shell');

describe('index.js', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    git.cherryPick = jest.fn();
    git.checkout = jest.fn();
    git.fetch = jest.fn();
    git.push = jest.fn();
    git.pull = jest.fn();
    git.setUpstreamBranch = jest.fn();

    git.getRootDirectoryPath = jest.fn(() => '/Users/Daniel/Projects/git-pick');
    git.getCurrentBranch = jest.fn(() => 'master');
    git.isAvailable = jest.fn(() => true);
    git.isCommitAvailable = jest.fn(() => true);
    git.isWorkingDirectoryClean = jest.fn(() => true);
    git.isCommitMergeable = jest.fn(() => true);

    shell.fail = jest.fn();
    shell.stop = jest.fn();
    shell.cd = jest.fn();
    shell.succeed = jest.fn();
  });

  describe('function exec()', () => {
    beforeEach(() => {
      gitPick('1234abc', ['branch1', 'branch2', 'branch3'], {});
    });

    test('calls git.isAvailable', () => {
      expect(git.isAvailable).toHaveBeenCalledTimes(1);
    });

    test('calls git.isCommitAvailable', () => {
      expect(git.isCommitAvailable).toHaveBeenCalledTimes(1);
    });

    test('calls git.isCommitAvailable with "1234abc"', () => {
      expect(git.isCommitAvailable).toBeCalledWith('1234abc');
    });

    test('calls git.isWorkingDirectoryClean', () => {
      expect(git.isWorkingDirectoryClean).toHaveBeenCalledTimes(1);
    });

    test('calls git.getRootDirectoryPath', () => {
      expect(git.getRootDirectoryPath).toHaveBeenCalledTimes(1);
    });

    test('calls git.getCurrentBranch', () => {
      expect(git.getCurrentBranch).toHaveBeenCalledTimes(1);
    });

    test('calls git.checkout', () => {
      expect(git.checkout).toHaveBeenCalledTimes(4);
    });

    test('calls git.isCommitMergeable', () => {
      expect(git.isCommitMergeable).toHaveBeenCalledTimes(3);
    });

    test('calls git.isCommitMergeable with "1234abc"', () => {
      expect(git.isCommitMergeable).toBeCalledWith('1234abc');
    });

    test('calls git.cherryPick', () => {
      expect(git.cherryPick).toHaveBeenCalledTimes(3);
    });

    test('calls git.cherryPick with "1234abc"', () => {
      expect(git.cherryPick).toBeCalledWith('1234abc');
    });

    test('calls git.push', () => {
      expect(git.push).toHaveBeenCalledTimes(3);
    });

    test('calls shell', () => {
      expect(shell.succeed).toHaveBeenCalledTimes(3);
    });
  });

  describe('git not available', () => {
    beforeEach(() => {
      git.isAvailable = jest.fn(() => false);
      git.isCommitAvailable = jest.fn(() => true);
      git.isWorkingDirectoryClean = jest.fn(() => true);

      gitPick('1234abc', []);
    });

    test('calls git.isAvailable', () => {
      expect(git.isAvailable).toHaveBeenCalledTimes(1);
    });

    test('calls shell.stop', () => {
      expect(shell.stop).toHaveBeenCalledTimes(1);
    });

    test('calls shell.stop with "git-pick requires git"', () => {
      expect(shell.stop).toBeCalledWith('git-pick requires git');
    });
  });

  describe('Commit does not exist', () => {
    beforeEach(() => {
      git.isAvailable = jest.fn(() => true);
      git.isCommitAvailable = jest.fn(() => false);
      git.isWorkingDirectoryClean = jest.fn(() => true);

      gitPick('1234abc', [], {});
    });

    test('calls git.isCommitAvailable', () => {
      expect(git.isCommitAvailable).toHaveBeenCalledTimes(1);
    });

    test('calls shell.stop', () => {
      expect(shell.stop).toHaveBeenCalledTimes(1);
    });

    test('calls shell.stop with "Commit does not exist"', () => {
      expect(shell.stop).toBeCalledWith('Commit does not exist');
    });
  });

  describe('Working directory is not clean', () => {
    beforeEach(() => {
      git.isAvailable = jest.fn(() => true);
      git.isCommitAvailable = jest.fn(() => true);
      git.isWorkingDirectoryClean = jest.fn(() => false);

      gitPick('1234abc', [], {});
    });

    test('calls git.isWorkingDirectoryClean', () => {
      expect(git.isWorkingDirectoryClean).toHaveBeenCalledTimes(1);
    });

    test('calls shell.stop', () => {
      expect(shell.stop).toHaveBeenCalledTimes(1);
    });

    test('calls shell.stop with "Working directory is not clean"', () => {
      expect(shell.stop).toBeCalledWith('Working directory is not clean');
    });
  });

  describe('Commit is not mergeable', () => {
    beforeEach(() => {
      git.isAvailable = jest.fn(() => true);
      git.isCommitAvailable = jest.fn(() => true);
      git.isWorkingDirectoryClean = jest.fn(() => true);
      git.isCommitMergeable = jest.fn(() => false);

      gitPick('1234abc', ['branch1'], {});
    });

    test('calls git.isCommitMergeable', () => {
      expect(git.isCommitMergeable).toHaveBeenCalledTimes(1);
    });

    test('calls shell.fail', () => {
      expect(shell.fail).toHaveBeenCalledTimes(1);
    });

    test('calls shell.fail with "[branch1] Commit is not mergeable"', () => {
      expect(shell.fail).toBeCalledWith('[branch1] Commit is not mergeable');
    });
  });

  describe('With option -p (--pull)', () => {
    test('calls git.pull', () => {
      gitPick('1234abc', ['branch1'], { pull: true });

      expect(git.pull).toHaveBeenCalledTimes(1);
    });

    test('calls shell.fail with "[branch1] Failed to auto merge remote branch"', () => {
      git.isWorkingDirectoryClean
        .mockImplementationOnce(() => true)
        .mockImplementation(() => false);

      gitPick('1234abc', ['branch1'], { pull: true });

      expect(shell.fail).toBeCalledWith('[branch1] Failed to auto merge remote branch');
    });
  });

  describe('with option -b (--new-branch)', () => {
    beforeEach(() => {
      gitPick('1234abc', ['branch1'], { newBranch: true });
    });

    test('calls git.checkout with "branch1_1234abc" and true', () => {
      expect(git.checkout).toBeCalledWith('branch1_1234abc', true);
    });

    test('calls git.setUpstreamBranch with "branch1_1234abc"', () => {
      expect(git.setUpstreamBranch).toBeCalledWith('branch1_1234abc');
    });

    test('calls shell.succeed with "[branch1_1234abc] Commit successfully merged"', () => {
      expect(shell.succeed).toBeCalledWith('[branch1_1234abc] Commit successfully merged');
    });
  });
});
