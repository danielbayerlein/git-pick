jest.mock('../../lib');
jest.mock('../../package.json', () => ({
  name: 'git-pick',
  version: '1.0.0',
}));

const program = require('commander');
const gitPick = require('../../lib');

describe('cli.js', () => {
  beforeEach(() => {
    program.version = jest.fn().mockReturnThis();
    program.arguments = jest.fn().mockReturnThis();
    program.action = jest.fn().mockImplementation(function action(cb) {
      cb('1234abc', ['branch1', 'branch2']);
      return this;
    });
    program.parse = jest.fn();
    program.args = jest.fn();
    program.help = jest.fn();

    require('../../bin/cli'); // eslint-disable-line global-require
  });

  it('to be called program.version with "1.0.0"', () => {
    expect(program.version).toBeCalledWith('1.0.0');
  });

  it('to be called gitPick with "\'1234abc\', [\'branch1\', \'branch2\']"', () => {
    expect(gitPick).toBeCalledWith('1234abc', ['branch1', 'branch2']);
  });
});
