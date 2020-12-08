import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import PortfolioScreen from "../screens/portfolio/PortfolioScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchScreen from "../screens/search/SearchScreen";
import HomeScreen from "../screens/home/HomeScreen";
import { Header } from "@react-navigation/stack";
import StockTransaction from "../screens/search/StockTransaction";
import FollowingScreen from "../screens/follow/FollowingScreen";
import FollowingPortfolio from "../screens/follow/FollowingPortfolio";

import Edu from "../screens/education/Edu";
const Tab = createBottomTabNavigator();

const SettingsStack = createStackNavigator();
const Portstack = createStackNavigator();
function SearchScreenNavigation() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SearchScreen" component={SearchScreen} />
      <SettingsStack.Screen
        name="StockTransaction"
        component={StockTransaction}
      />
    </SettingsStack.Navigator>
  );
}
function Portstackr() {
  return (
    <Portstack.Navigator>
      <Portstack.Screen name="Profile" component={ProfileScreen} />
      <Portstack.Screen name="Education" component={Edu} />
    </Portstack.Navigator>
  );
}

function FollowerPortfolio() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="FollowBoard" component={FollowingScreen} />
      <SettingsStack.Screen
        name="FollowingPortfolio"
        component={FollowingPortfolio}
      />
    </SettingsStack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Portfolio") {
              iconName = "folder";
            } else if (route.name === "Profile") {
              iconName = "account";
            } else if (route.name === "Search") {
              iconName = "magnify";
            } else if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Following") {
              iconName = "human-male-female";
            }

            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name={iconName}
                color={color}
                size={size}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#008000",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Search" component={SearchScreenNavigation} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        <Tab.Screen name="Following" component={FollowerPortfolio} />
        <Tab.Screen name="Profile" component={Portstackr} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
