import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import RegistrationScreen from "../screens/registration/RegistrationScreen";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../screens/login/Login";

const Stack = createStackNavigator();

export default function StartUpNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Login'} component={Login}/>

                <Stack.Screen name={'Registration'} component={RegistrationScreen}/>
            </Stack.Navigator>
</NavigationContainer>
    );

};