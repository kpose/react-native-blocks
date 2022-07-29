import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-ethers';

// Go to https://infura.io/, sign up, create
// a new App in its dashboard, and replace "KEY" with your project key
const INFURA_PROJECT_ID = '20ba9abd915441f0aa623a3e5b5d440b';

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const ROBSTEN_PRIVATE_KEY =
  'd01769783ce541ca4c9719bd8afbf7bd43345f51990e1985a304ef8488ad137d';

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROBSTEN_PRIVATE_KEY}`],
    },
  },
};

export default config;
