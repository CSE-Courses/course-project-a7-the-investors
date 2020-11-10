import * as React from 'react';
import {Alert, AsyncStorage, Dimensions, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import * as SecureStore from 'expo-secure-store';
import Login from "./screens/login/Login";

import StartUpNavigation from "./navigation/StartUpNavigation";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import RegistrationScreen from "./screens/registration/RegistrationScreen";
import TabNavigator from "./navigation/TabNavigator";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchScreen from "./screens/search/SearchScreen";
import HomeScreen from "./screens/home/HomeScreen";
import PortfolioScreen from "./screens/portfolio/PortfolioScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import StockTransaction from "./screens/search/StockTransaction";


export default class App extends React.Component {

    constructor(props) {

        super(props);
        this.changeLoginStatus = this.changeLoginStatus.bind(this)
        this.rmLoginStatus = this.rmLoginStatus.bind(this);
        this.state = {
            loggedIn: false,
            session: 'ralkajsdf;alsdkfj',

        }

    }

    componentDidMount() {
        //this.isLoggedIn();
    }

    changeLoginStatus() {
        console.log("RAN CHANGE LOGIN")
        this.setState({loggedIn: true});
        console.log(this.state.loggedIn);
    }

    rmLoginStatus() {
        this.setState({loggedIn: false});
        console.log(this.state.loggedIn);
    }

    isLoggedIn() {
        //const userID = SecureStore.getItem('userID');
        SecureStore.getItemAsync('session').then(sessionToken => {
            this.setState({
                session: sessionToken,
                loggedIn: true
            })
        });
    }


    tabNavigatorRender() {
        const Tab = createBottomTabNavigator();

        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({color, size}) => {
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
                    <Tab.Screen name="Profile">
                        {props => <ProfileScreen {...props} changeLoginStatus={this.rmLoginStatus}/>}
                    </Tab.Screen>
                    <Tab.Screen name={"StockTransaction"} component={StockTransaction}/>

                </Tab.Navigator>

            </NavigationContainer>
        );
    }


    loginAndRegistration() {
        const Stack = createStackNavigator();


        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={'Login'}>
                        {props => <Login {...props} changeLoginStatus={this.changeLoginStatus}/>}
                    </Stack.Screen>

                    <Stack.Screen name={'Registration'}>
                        {props => <RegistrationScreen {...props} changeLoginStatus={this.changeLoginStatus}/>}

                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    render() {

        if (!this.state.loggedIn) {
            return (this.loginAndRegistration());
        } else {
            return (<TabNavigator/>);

        }

    }
};


const widthfoot = Dimensions.get('window').width;

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        paddingTop: 30,
        margin: 10,
    },
    image: {
        width: 123,
        height: 81,
    },
    input: {
        borderWidth: 1,
        borderColor: "#777",
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    login: {
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        fontSize: 14,
    },
    setInfo: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 5,
    },
    touchable: {
        justifyContent: "center",
        alignItems: "center",
        color: "#B95C24",
        padding: 10,
    },
    touchableButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B95C24",
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 10,
        borderRadius: 15,
    },
    touchableText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },


    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },

    welcomeWords: {
        color: '#403f42',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: "center",
    },
    footer: {
        flex: 4,
        backgroundColor: '#889b73',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        width: widthfoot,
        paddingVertical: 30

    },
    footerWords: {
        paddingTop: 20,
        paddingBottom: 10,
        color: '#05375a',
        fontSize: 20,
        textAlign: 'left'
    },
    textInput: {
        height: 40,
        borderColor: '#EAFAF1',
        borderWidth: 3,
        marginBottom: 0,
        color: '#05375a',

    },
    forgotPass: {
        color: '#05375a',
        fontSize: 10,
        textAlign: 'left',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 6
    },

    buttonSign: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginLeft: widthfoot / 2,
        marginTop: 20,


    },
    buttonForgot: {
        backgroundColor: "#889b73",
        borderRadius: 3,
        marginRight: widthfoot / 2,


    },
    buttonWords: {
        fontSize: 18,
        color: "#008000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

