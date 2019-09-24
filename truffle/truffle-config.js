const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const path = require('path');

const cmd = process.argv[2];
const IS_PUBLISH = cmd === 'publish';
let mnemonic;

if (IS_PUBLISH) {
  // Read the mnemonic from a file that's not committed to github, for security.
  mnemonic = fs
    .readFileSync(path.join(__dirname, 'deploy_mnemonic.key'), {
      encoding: 'utf8',
    })
    .trim();
}

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      network_id: '*', // Any network (default: none)
      gas: 6000000,
      port: 8545,
      // port: 8546,
      // websockets: true,
    },
    ropsten: {
      provider: new HDWalletProvider(
        mnemonic,
        'https://ropsten.infura.io/v3/<INFURA_PROJECT_ID>'
      ),
      network_id: 3,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.5.0',
    },
  },
};
