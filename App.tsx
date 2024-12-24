import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import RootStack from './src/navigators/RootStack';
import {NavigationContainer} from '@react-navigation/native';
import { navigationRef } from './src/utils/navigation';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
