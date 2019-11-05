# git-pick

[![npm version](https://badge.fury.io/js/%40danielbayerlein%2Fgit-pick.svg)](https://badge.fury.io/js/%40danielbayerlein%2Fgit-pick)
[![Actions Status](https://github.com/danielbayerlein/git-pick/workflows/CI/badge.svg)](https://github.com/danielbayerlein/git-pick/actions)
[![codecov](https://codecov.io/gh/danielbayerlein/git-pick/branch/master/graph/badge.svg)](https://codecov.io/gh/danielbayerlein/git-pick)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=danielbayerlein/git-pick)](https://dependabot.com)

`git cherry-pick <commit>` to multiple branches.
With `git-pick` you can cherry-pick a commit to multiple branches.

## Installation

```bash
# npm
npm install @danielbayerlein/git-pick --global

# Yarn
yarn global add @danielbayerlein/git-pick
```

## Usage

```bash
git-pick [options] <commit> <branches...>
```

### Options

```
-b, --new-branch Creates a new feature branch for each given branch
-p, --pull       Fetches the changes from the remote branch, before cherry-pick the commit
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new [Pull Request](../../pull/new/master)

## Copyright

Copyright (c) 2016-present Daniel Bayerlein. See [LICENSE](./LICENSE.md) for details.
