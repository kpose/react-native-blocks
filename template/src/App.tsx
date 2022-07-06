/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the React Natve Blocks template
 * https://github.com/kpose/react-native-blocks
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './screens/Home';

const App = () => {
  const web3 = new Web3('http://localhost:7545');
  const newWallet = web3.eth.accounts.wallet.create(1);
  const newAccount = newWallet[0];
  console.log(newAccount);

  const deepLinklUriScheme = 'fondus://';
  return (
    <WalletConnectProvider
      redirectUrl={deepLinklUriScheme}
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}>
      <Home />
    </WalletConnectProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
