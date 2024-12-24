import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SelectRole from '../screens/Auth/SelectRole/SelectRole';

const Stack = createNativeStackNavigator()

const RootStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='SelectRole' component={SelectRole}/>
    </Stack.Navigator>
  )
}

export default RootStack


