import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import TabNavigator from "./navigation/TabNavigator";




export default function App() {
  return (
      <TabNavigator/>
  );
};
