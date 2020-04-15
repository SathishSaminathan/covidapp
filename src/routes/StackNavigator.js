import React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import GetStarted from '../screens/GetStarted';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="GetStarted" component={GetStarted} />
    </Stack.Navigator>
  );
}

export {MyStack};
