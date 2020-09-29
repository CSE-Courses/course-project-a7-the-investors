import * as React from 'react';
import {Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import TabNavigator from "./navigation/TabNavigator";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";







export default class App extends React.Component {

    constructor(){

        super();

    };
    state = {
        renderReg: true,
        renderLogin: false,
        renderTab: false,
    }

    _setReg(){
        this.setState({renderReg: false, renderLogin: true})
    }

    _setLogin(){
        this.setState({renderTab: true, renderLogin: false})
    }



    _renderRegistration() {
        {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.imageContainer}>

                    </View>
                    <TouchableOpacity style={styles.touchableButton}>
                        <Text style={styles.touchableText}> Sign up with Google </Text>
                        {/*onPress={()=> go to google and get info*/}
                    </TouchableOpacity>

                    <Text style={styles.setInfo}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your username"
                        autoCapitalize="none"
                        //onChangeText={(val) => setUsername(val)}
                    />

                    <Text style={styles.setInfo}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your email"
                        autoCapitalize="none"
                        //onChangeText={(val) => setEmail(val)}
                    />

                    <Text style={styles.setInfo}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Your password"
                        autoCapitalize="none"
                        //onChangeText={(val) => setPasswordAttempt1(val)}
                    />

                    <Text style={styles.setInfo}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Your password"
                        autoCapitalize="none"
                        //onChangeText={(val) => setPasswordAttempt2(val)}
                    />

                    <TouchableOpacity style={styles.touchableButton}>
                        <Text style={styles.touchableText}> Sign Up </Text>
                        {/*onPress={()=> add to database and go to home?*/}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchable}
                                      onPress={() => this._setReg()}>
                        <Text style={styles.loginText}> Already signed up? Login </Text>

                    </TouchableOpacity>
                </SafeAreaView>
            );
        }
    }

    _renderLogin() {

        return (

            <View style={styles.container}>

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
                    />
                    <Text style={styles.footerWords}>Password</Text>
                    <TextInput
                        placeholder="Your top secret Password"
                        style={styles.textInput}
                        autoCapitalize="none"

                    /><TouchableOpacity onPress={() => Alert.alert('Try hard look deep into your memory')}
                                        style={styles.buttonForgot}>
                    <Text style={styles.forgotPass}>Forgot Password?</Text>
                </TouchableOpacity>

                    <TouchableOpacity onPress={() => this._setLogin()}
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

                    <TouchableOpacity onPress={() => {
                        this._setLogin();
                    }}
                                      style={styles.buttonSign}>
                        <Text style={styles.buttonWords}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>


        );

    }




    render(){
        if (this.state.renderReg) {
            return (this._renderRegistration());

        }else if (this.state.renderLogin) {
            return (this._renderLogin());
        }else {
            return(<TabNavigator/>)
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

