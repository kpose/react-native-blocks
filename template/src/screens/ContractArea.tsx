import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import useContract from '../hooks/useContract.hook';
import Greeter from '../../artifacts/contracts/Greeter.sol/Greeter.json';

const INFURA_PROJECT_ID = '20ba9abd915441f0aa623a3e5b5d440b';
const CONTRACT_ADDRESS = '0x4dadDB382eFE6BeAE28EBb1Ee46c022AD3a4fb10';
const CONTRACT_ABI = Greeter.abi;

const ContractArea = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isFetching, setIsFecthing] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [newGreeting, setNewGreeting] = useState('');
  const connector = useWalletConnect();

  const [contract] = useContract({
    infuraId: INFURA_PROJECT_ID,
    contractAddress: CONTRACT_ADDRESS,
    contractAbi: CONTRACT_ABI,
  });

  /* check if metamask is connected */
  const checkConnectivity = useCallback(() => {
    if (!connector || !connector.connected) {
      Alert.alert(
        'Attention',
        'You need to connect your metamask account first',
        [
          {
            text: 'Ignore',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'Connect', onPress: () => connector.connect()},
        ],
      );
      return;
    }
    connector.connect();
  }, [connector]);

  /* fetch Greeter contract greeting */
  const onGetPress = useCallback(async () => {
    checkConnectivity();
    try {
      setIsFecthing(true);
      const greeting = await contract.getGreeting();
      Alert.alert(greeting);
      setIsFecthing(false);
    } catch (err) {
      setIsFecthing(false);
      console.log('Error: ', err);
    }
  }, [checkConnectivity, contract]);

  /* fetch Greeter contract greeting */
  const onSetGreeting = useCallback(async () => {
    checkConnectivity();
    try {
      setIsSetting(true);
      await contract.setGreeting(newGreeting);
      Alert.alert('Greeting updated successfully');
      setNewGreeting('');
      setIsSetting(false);
    } catch (err) {
      setIsSetting(false);
      console.log('Error: ', err);
    }
  }, [checkConnectivity, contract, newGreeting]);

  const isDisabled = useCallback(() => {
    if (!newGreeting || isSetting) {
      return true;
    }
    return false;
  }, [newGreeting, isSetting]);

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        Interact with smart contracts
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        This template has been pre configured with an example smart contract to
        help you quickly get started.
      </Text>

      <View style={styles.contractButtonsContainer}>
        <Pressable style={styles.contractButton} onPress={onGetPress}>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            {isFetching ? 'Fetching!' : 'Get greeting'}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.contractButton,
            // eslint-disable-next-line react-native/no-inline-styles
            {backgroundColor: isDisabled() ? '#a2a8a7' : '#599186'},
          ]}
          disabled={isDisabled()}
          onPress={onSetGreeting}>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
            Set greeting
          </Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setNewGreeting}
        value={newGreeting}
        placeholder="Enter new greeting"
      />
    </View>
  );
};

export default ContractArea;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  contractButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 7,
  },
  contractButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#599186',
    borderRadius: 5,
    padding: 6,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
