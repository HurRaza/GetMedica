import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DoctorList from '../screens/Patient/DoctorList';
import PatientAppointments from '../screens/Patient/PatientAppointments';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookAppointments from '../screens/Patient/BookAppointments';
import {RootStackNavigationType} from '../utils/types/navigationType';
import {CustomIcon} from '../components/common/CustomIcon';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../utils/theme';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Stack = createNativeStackNavigator<RootStackNavigationType>();
const Tab = createBottomTabNavigator<RootStackNavigationType>();

const PatientStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DoctorList" component={DoctorList} />
      <Stack.Screen name="BookAppointments" component={BookAppointments} />
    </Stack.Navigator>
  );
};

const PatientNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.TabBarStyle,
      }}>
      <Tab.Screen
        name="PatientStack"
        component={PatientStack}
        options={{
          title: 'Doctor List',
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              color={focused ? COLORS.primary : COLORS.NeutralGrey100}
              size={RFValue(18)}
              type={'FontAwesome5'}
              icon="briefcase-medical"
            />
          ),
        }}
      />
      <Tab.Screen
        name="PatientAppointments"
        component={PatientAppointments}
        options={{
          title: 'Appointments',
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              color={focused ? COLORS.primary : COLORS.NeutralGrey100}
              size={RFValue(18)}
              type={'Ionicons'}
              icon="calendar-number"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default PatientNavigator;

const styles = StyleSheet.create({
  TabBarStyle: {
    height: heightPercentageToDP(10),
    position: 'relative',
    borderTopWidth: 2,
    paddingTop: RFValue(5),
    elevation: 0,
    borderColor: COLORS.NeutralGrey10
  },
});