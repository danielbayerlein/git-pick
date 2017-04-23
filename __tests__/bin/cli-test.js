jest.mock('../../lib')
jest.mock('../../package.json', () => ({
  name: 'git-pick',
  version: '1.0.0'
}))

describe('cli.js', () => {
  let program
  let gitPick
  let updateNotifier

  function cli () {
    require('../../bin/cli')
  }

  beforeEach(() => {
    program = require('commander')
    updateNotifier = require('update-notifier')
    gitPick = require('../../lib')

    program.version = jest.fn().mockReturnThis()
    program.arguments = jest.fn().mockReturnThis()
    program.option = jest.fn().mockReturnThis()
    program.action = jest.fn().mockImplementation(function action (cb) {
      // eslint-disable-next-line standard/no-callback-literal
      cb('1234abc', ['branch1', 'branch2'], { newBranch: true })
      return this
    })
    program.parse = jest.fn()
    program.args = jest.fn()
    program.help = jest.fn()

    updateNotifier.notify = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  test('calls program.version with "1.0.0"', () => {
    cli()
    expect(program.version).toBeCalledWith('1.0.0')
  })

  test('calls program.option with "-b" and "-p"', () => {
    cli()
    expect(program.option).toBeCalledWith('-b, --new-branch', 'Creates a new feature branch for each given branch')
    expect(program.option).toBeCalledWith('-p, --pull', 'Fetches the changes from the remote branch, before cherry-pick the commit')
  })

  test('calls gitPick with "\'1234abc\', [\'branch1\', \'branch2\'], { newBranch: true }"', () => {
    cli()
    expect(gitPick).toBeCalledWith('1234abc', ['branch1', 'branch2'], { newBranch: true })
  })

  test('calls the help method if called without arguments', () => {
    cli()
    expect(program.help).toBeCalled()
  })

  test('doesn´t call the help method when called with any arguments', () => {
    program.args = ['1234abc', ['branch1']]
    cli()
    expect(program.help).not.toBeCalled()
  })

  test('calls parse with the given process.argv', () => {
    process.argv.push('1234abc')
    process.argv.push('branch1')
    cli()

    const args = program.parse.mock.calls[0][0]
    expect(args[2]).toBe('1234abc')
    expect(args[3]).toEqual('branch1')
  })
})
