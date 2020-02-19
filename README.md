# Rebalancer Boilerplate

## Install :computer:
Before getting started, make sure you have yarn or npm:
```bash
$ brew install yarn
```
```bash
$ brew install npm
```

To setup, install packages and copy local .env:
```bash
$ cp .env.default .env
$ yarn install --ignore-engines
```
NOTE: Heroku does not allow for two types of lock files so only do `yarn install` vs `npm install`

Walk through the steps in the API Integration Walkthrough in order to:
- Set up your wallet with mnemonic
- Set up Infura
- Set up your .env file

Running local instance:
```bash
$ yarn run start-dev
```

Running tests:
```bash
$ yarn test
```
Troubleshooting:
- If you run into issues with `build/Release/scrypt` not being found, run `npm run fix-scrypt`
- If you run into issues with `gyp` and `AttributeError: 'NoneType' object has no attribute 'groups'`, then Install Command Line Tools (if you haven't already), `xcode-select --install`, Enable command line tools, `sudo xcode-select --switch /Library/Developer/CommandLineTools`, and update node-gyp, `sudo npm explore npm -g -- npm install node-gyp@latest`
