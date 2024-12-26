import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SelectRole from '../screens/Auth/SelectRole/SelectRole';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';
import {useStore} from '../services/store/store';
import DoctorNavigator from './DoctorNavigator';
import PatientNavigator from './PatientNavigator';
import {RootStackNavigationType} from '../utils/types/navigationType';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../utils/theme';

const Stack = createNativeStackNavigator<RootStackNavigationType>();

const RootStack = () => {
  const {user} = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size={widthPercentageToDP(25)}
          color={COLORS.primary}
        />
      </View>
    );
  }

  const getInitialRouteName = () => {
    if (user) {
      if (user.role == 'doctor') {
        return 'DoctorNavigator';
      }
      return 'PatientNavigator';
    }
    return 'SelectRole';
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SelectRole" component={SelectRole} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="DoctorNavigator" component={DoctorNavigator} />
      <Stack.Screen name="PatientNavigator" component={PatientNavigator} />
    </Stack.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
