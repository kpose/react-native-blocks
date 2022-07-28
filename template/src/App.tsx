import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import Web3 from 'web3';

const App = () => {
  const web3 = new Web3('http://localhost:7545');
  const newWallet = web3.eth.accounts.wallet.create(1);
  const newAccount = newWallet[0];
  console.log(newAccount);
  return <RootNavigator />;
};

export default App;
