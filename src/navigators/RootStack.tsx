import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SelectRole from '../screens/Auth/SelectRole/SelectRole';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SelectRole" component={SelectRole} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default RootStack;
