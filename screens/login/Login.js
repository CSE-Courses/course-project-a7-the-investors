import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Button, Text, View, TouchableOpacity, Dimensions, TextInput, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegistrationScreen from "../registration/RegistrationScreen";
import {AsyncStorage} from 'react-native';
import Parse from 'parse/react-native.js';
import * as SecureStore from "expo-secure-store";
import { getpasswd, getUserName, setEmail, setID, setpass, setUserName } from '../profile/Info';


const height = Dimensions.get('window').height * 0.75;
const widthfoot = Dimensions.get('window').width;


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password:''
        }
    }

    componentDidMount() {
        AsyncStorage.clear();
    }

    async login(){
        console.log("LOGGIN IN")
        Parse.setAsyncStorage(AsyncStorage);
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz', // This is your Application ID
            '97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4' // This is your Javascript key
        );

        let sessionToken;
        let userId;
        let stocks;
        let cash;
        let following;
        await Parse.User.logIn(this.state.email,this.state.password).then((user) => {
            // Do stuff after successful login
            if (typeof document !== 'undefined') document.write(`Logged in user: ${JSON.stringify(user)}`);
            //console.log("TOKEN:   "  + user.get('sessionToken'))
            this.props.changeLoginStatus();
            sessionToken = user.get('sessionToken');
            setUserName(this.state.email);
            console.log(getUserName());
            setpass(this.state.password);
            setEmail(Parse.User.current().id);
            userId = user.id;
            stocks = user.get('stocks');
            cash = user.get('cash')
            following = user.get('following');
            username = user.get('username');

        }).catch(error => {
            if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);
            console.error('Error while logging in user', error);
        })
        await SecureStore.setItemAsync('sessionToken', JSON.stringify(sessionToken)).then(() => {
            console.log("SESSION TOKEN: " + sessionToken)
        })

        await SecureStore.setItemAsync('userId', JSON.stringify(userId)).then(() => {
            console.log("USERID: " + userId)
        })

        await SecureStore.setItemAsync('cash', JSON.stringify(cash)).then(() => {
            console.log("CASH:" + cash)
        })

        console.log("THIS IS STOCKS: ")
        console.log(stocks)

        if (stocks === undefined) {
            stocks = [];
        }
        if (following === undefined) {
            following = [];
        }
        await SecureStore.setItemAsync('stockList', JSON.stringify(stocks)).then(() => {
            console.log("Stocks: " + stocks)
        });
        await SecureStore.setItemAsync('followingList', JSON.stringify(following)).then(() => {
            console.log("following: " + following)
        });
        await SecureStore.setItemAsync('username', JSON.stringify(username)).then(() => {
            console.log("username:" + username)
        })
    }


    render() {

        return (

            <KeyboardAwareScrollView
            style={{ backgroundColor: 'white' }}
            resetScrollToCoords={{ x:0, y:0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}>

                <StatusBar style="auto"/>
                <View style={styles.header}>
                    <Text style={styles.welcomeWords}>Welcome! Happy Trading Games, and may the odds be ever in your
                        favor. </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerWords}>Username</Text>
                    <TextInput
                        placeholder="Your Username/Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({email: text})}

                    />
                    <Text style={styles.footerWords}>Password</Text>
                    <TextInput
                        placeholder="Your top secret Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry={true}

                    /><TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}
                                        style={styles.buttonForgot}>
                    <Text style={styles.forgotPass}>Forgot Password?</Text>
                </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.login()}
                                      style={styles.buttonSign}>
                        <Text style={styles.buttonWords}>Sign In</Text>
                    </TouchableOpacity>

                    <Text style={{
                        color: '#403f42',
                        fontWeight: 'bold',
                        fontSize: 25,
                        alignItems: 'center',
                        paddingLeft: widthfoot - (widthfoot / 3),
                        paddingTop: 10
                    }}>Or</Text>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Registration')}
                                      style={styles.buttonSign}>
                        <Text style={styles.buttonWords}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>


        );
    }
}

const styles = StyleSheet.create({
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
        borderRadius: 5,
        padding: 10,
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
/*export function avo(){
    this.props.rmLoginStatus();
  }
  
  module.exports = {
    functions: avo,
  };*/