import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackNavigationType} from '../../../utils/types/navigationType';

const Login = () => {
  const {params} = useRoute<RouteProp<RootStackNavigationType, 'Login'>>();
  console.log(params?.role);
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
