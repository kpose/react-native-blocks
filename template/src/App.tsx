import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import Web3 from 'web3';
import {Platform} from 'react-native';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const web3 = new Web3('http://localhost:7545');
  const newWallet = web3.eth.accounts.wallet.create(1);
  const newAccount = newWallet[0];

  const deepLinklUriScheme = 'yourdeeplinkuri://';

  console.log(newAccount);
  return (
    <WalletConnectProvider
      redirectUrl={
        Platform.OS === 'web' ? window.location.origin : deepLinklUriScheme
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}>
      <RootNavigator />
    </WalletConnectProvider>
  );
};

export default App;
