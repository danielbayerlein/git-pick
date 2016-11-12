const gitPick = require('../../lib/');
const git = require('../../lib/git');
const shell = require('../../lib/shell');

describe('index.js', () => {
  describe('function exec()', () => {
    beforeEach(() => {
      git.isAvailable = jest.fn(() => true);
      git.isCommitAvailable = jest.fn(() => true);
      git.isWorkingDirectoryClean = jest.fn(() => true);
      git.getRootDirectoryPath = jest.fn(() => '/Users/Daniel/Projects/git-pick');
      git.getCurrentBranch = jest.fn(() => 'master');
      git.checkout = jest.fn();
      git.isCommitMergeable = jest.fn(() => true);
      git.cherryPick = jest.fn();
      git.push = jest.fn();

      shell.cd = jest.fn();
      shell.fail = jest.fn();
      shell.stop = jest.fn();
      shell.succeed = jest.fn();

      gitPick('1234abc', ['branch1', 'branch2', 'branch3']);
    });

    it('to be called git.isAvailable', () => {
      expect(git.isAvailable).toHaveBeenCalledTimes(1);
    });

    it('to be called git.isCommitAvailable', () => {
      expect(git.isCommitAvailable).toHaveBeenCalledTimes(1);
    });

    it('to be called git.isCommitAvailable with "1234abc"', () => {
      expect(git.isCommitAvailable).toBeCalledWith('1234abc');
    });

    it('to be called git.isWorkingDirectoryClean', () => {
      expect(git.isWorkingDirectoryClean).toHaveBeenCalledTimes(1);
    });

    it('to be called git.getRootDirectoryPath', () => {
      expect(git.getRootDirectoryPath).toHaveBeenCalledTimes(1);
    });

    it('to be called git.getCurrentBranch', () => {
      expect(git.getCurrentBranch).toHaveBeenCalledTimes(1);
    });

    it('to be called git.checkout', () => {
      expect(git.checkout).toHaveBeenCalledTimes(4);
    });

    it('to be called git.isCommitMergeable', () => {
      expect(git.isCommitMergeable).toHaveBeenCalledTimes(3);
    });

    it('to be called git.isCommitMergeable with "1234abc"', () => {
      expect(git.isCommitMergeable).toBeCalledWith('1234abc');
    });

    it('to be called git.cherryPick', () => {
      expect(git.cherryPick).toHaveBeenCalledTimes(3);
    });

    it('to be called git.cherryPick with "1234abc"', () => {
      expect(git.cherryPick).toBeCalledWith('1234abc');
    });

    it('to be called git.push', () => {
      expect(git.push).toHaveBeenCalledTimes(3);
    });

    it('to be called shell', () => {
      expect(shell.succeed).toHaveBeenCalledTimes(3);
    });
  });
});
