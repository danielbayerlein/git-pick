# git-pick

[![npm version](https://badge.fury.io/js/%40danielbayerlein%2Fgit-pick.svg)](https://badge.fury.io/js/%40danielbayerlein%2Fgit-pick)
[![Build Status](https://travis-ci.org/danielbayerlein/git-pick.svg?branch=master)](https://travis-ci.org/danielbayerlein/git-pick)
[![Coverage Status](https://coveralls.io/repos/github/danielbayerlein/git-pick/badge.svg?branch=master)](https://coveralls.io/github/danielbayerlein/git-pick?branch=master)

`git cherry-pick <commit>` to multiple branches.
With `git-pick` you can cherry-pick a commit to multiple branches.

## Installation

```bash
# npm
$ npm install @danielbayerlein/git-pick --global

# Yarn
$ yarn global add @danielbayerlein/git-pick --global
```

## Usage

```bash
$ git-pick <commit> <branches...>
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new [Pull Request](../../pull/new/master)

## Copyright

Copyright (c) 2016 Daniel Bayerlein. See [LICENSE](./LICENSE.md) for details.
