import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PortfolioScreen from "../screens/portfolio/PortfolioScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchScreen from "../screens/search/SearchScreen";
import HomeScreen from "../screens/home/HomeScreen";
import {Header} from "@react-navigation/stack";


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator


                screenOptions={({route}) => ({
                    tabBarIcon: ({ color, size}) => {
                        let iconName;

                        if (route.name === 'Portfolio') {
                            iconName = "folder"
                        } else if (route.name === 'Profile') {
                            iconName = "account"
                        } else if (route.name === 'Search') {
                            iconName = "magnify"
                        } else if (route.name === 'Home') {
                            iconName = "home"
                        }

                        // You can return any component that you like here!
                        return <MaterialCommunityIcons name={iconName} color={color} size={size}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen name="Search" component={SearchScreen}/>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Portfolio" component={PortfolioScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>

            </Tab.Navigator>

        </NavigationContainer>
    );

};