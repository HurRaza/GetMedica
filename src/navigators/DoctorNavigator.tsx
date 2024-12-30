import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SetAvailability from '../screens/Doctor/SetAvailability/SetAvailability';
import DoctorAppointments from '../screens/Doctor/DoctorAppointments';
import {RootStackNavigationType} from '../utils/types/navigationType';
import {CustomIcon} from '../components/common/CustomIcon';
import {COLORS} from '../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator<RootStackNavigationType>();

const DoctorNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarStyle: styles.TabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
      }}>
      <Tab.Screen
        name="SetAvailability"
        component={SetAvailability}
        options={{
          title: 'Set Availability',
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              color={focused ? COLORS.primary : COLORS.NeutralGrey60}
              size={RFValue(18)}
              type={'AntDesign'}
              icon="calendar"
            />
          ),
        }}
      />
      <Tab.Screen
        name="DoctorAppointments"
        component={DoctorAppointments}
        options={{
          title: 'Appointments',
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              color={focused ? COLORS.primary : COLORS.NeutralGrey60}
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

export default DoctorNavigator;

const styles = StyleSheet.create({
  TabBarStyle: {
    height: heightPercentageToDP(8),
    position: 'relative',
    borderTopWidth: 2,
    elevation: 0,
    borderColor: COLORS.NeutralGrey10,
  },
  tabBarItemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabelStyle: {
    fontSize: RFValue(10),
    marginTop: 2,
  },
});
