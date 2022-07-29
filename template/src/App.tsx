import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {Platform} from 'react-native';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const deepLinklUriScheme = 'yourdeeplinkuri://';
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
