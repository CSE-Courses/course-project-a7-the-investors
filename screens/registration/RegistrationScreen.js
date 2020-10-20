import * as React from "react";
import {AsyncStorage} from 'react-native';
import Parse from 'parse/react-native.js';
import {
    Text,
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    Image,
} from "react-native";
import {Component} from "react";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

export default class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''

        }
    }

    /*const [data, setData] = React.useState({
          username: '',
          email: '',
          password: '',
      });*/

    async createAccount() {
        Parse.setAsyncStorage(AsyncStorage);
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz', // This is your Application ID
            '97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4' // This is your Javascript key
        );

        const user = new Parse.User()
        // const user = new User();

        user.set("username", this.state.username);
        user.set("email", this.state.email);
        user.set("password", this.state.password);
        let successfulLogin = false;
        await user.signUp().then((user) => {
            if (typeof document !== 'undefined') document.write(`User signed up: ${JSON.stringify(user)}`);
            console.log('User signed up', user);
            successfulLogin = true;
        }).catch(error => {
            if (typeof document !== 'undefined') document.write(`Error while signing up user: ${JSON.stringify(error)}`);
            console.error('Error while signing up user', error);
        });

        if (successfulLogin) {
            let sessionToken;
            let userId;
            await Parse.User.logIn(this.state.email, this.state.password).then((user) => {
                // Do stuff after successful login
                if (typeof document !== 'undefined') document.write(`Logged in user: ${JSON.stringify(user)}`);
                //console.log("TOKEN:   "  + user.get('sessionToken'))
                this.props.changeLoginStatus();
                sessionToken = user.get('sessionToken');
                userId = user.id;

            }).catch(error => {
                if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);
                console.error('Error while logging in user', error);
            })


            await SecureStore.setItemAsync('sessionToken', sessionToken).then(() => {
                console.log("SET ITEM")
            })

            await SecureStore.setItemAsync('userId', userId).then(() => {
                console.log("SET ITEM")
            })

            SecureStore.getItemAsync('sessionToken').then(token => {
                console.log("THIS IS THE TOKEN" + token);
            });
        }


    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require("../../assets/stockPhoto.jpg")}
                    />
                </View>
                <TouchableOpacity style={styles.touchableButton} >
                    <Text style={styles.touchableText}> Sign up with Google </Text>
                </TouchableOpacity>

                <Text style={styles.setInfo}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your username"
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({username: text})}
                />

                <Text style={styles.setInfo}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your email"
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({email: text})}
                />

                <Text style={styles.setInfo}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Your password"
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({password: text})}
                />

                <Text style={styles.setInfo}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Your password"
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({confirmPassword: text})}
                />

                <TouchableOpacity style={styles.touchableButton} onPress={() => this.createAccount()}>
                    <Text style={styles.touchableText}> Sign Up </Text>
                    {/*onPress={()=> add to database and go to home?*/}
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchable}
                                  onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text style={styles.loginText}> Already signed up? Login </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}
styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
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
});
