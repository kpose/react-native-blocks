import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import HomeStack from './HomeStack';

const linking = {
  prefixes: ['yourdeeplinkuri://'],
};

export default function RootNavigator() {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator color="blue" size="large" />}>
      <HomeStack />
    </NavigationContainer>
  );
}
