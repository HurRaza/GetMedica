import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SetAvailability from '../screens/Doctor/SetAvailability/SetAvailability';
import DoctorAppointments from '../screens/Doctor/DoctorAppointments';
import {RootStackNavigationType} from '../utils/types/navigationType';

const Tab = createBottomTabNavigator<RootStackNavigationType>();

const DoctorNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="SetAvailability"
        component={SetAvailability}
        options={{title: 'Set Availability'}}
      />
      <Tab.Screen
        name="DoctorAppointments"
        component={DoctorAppointments}
        options={{title: 'DoctorAppointments'}}
      />
    </Tab.Navigator>
  );
};

export default DoctorNavigator;

const styles = StyleSheet.create({});
