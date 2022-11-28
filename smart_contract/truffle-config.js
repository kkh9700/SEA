const HDWalletProvider = require('@truffle/hdwallet-provider');
// const mnemonicPhrase = "famous primary bronze foster egg outdoor galaxy arm stage talk snake buzz";
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
module.exports = {


  networks: {

    //  host: "20.196.209.2",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
    //  network_id: "*",       // Any network (default: none)
    //  from:"0xE09b8524A2DeF7C8d1cbc172ebAAFD5bEEeEFC7a",
    // },
    ropsten: {
    provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/4199cf55c7e54bf1a6b4b03849ce3066`),
    network_id: 3,       // Ropsten's id
    gas: 5500000,        // Ropsten has a lower block limit than mainnet
    confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     },



  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.4",    
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
  }
};
