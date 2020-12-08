import * as React from "react";
import {AsyncStorage, KeyboardAvoidingView} from "react-native";
import Parse from "parse/react-native.js";
import {
    getpasswd,
    getUserName,
    setEmail,
    setID,
    setpass,
    setUserName,
} from "../profile/Info";
import {
    Text,
    View,
    StyleSheet,
    Button,
    Image,
    Dimensions,
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Component} from "react";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

const widthfoot = Dimensions.get("window").width;

export default class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            nameErrorMessage: "",
            emailErrorMessage: "",
            passwordErrorMessage: "",
            confirmPasswordErrorMessage: "",
        };
    }

    componentDidMount() {
        AsyncStorage.clear();
    }

    async createAccount() {
        if (this.validate) {
            Parse.setAsyncStorage(AsyncStorage);
            Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
            Parse.initialize(
                "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz", // This is your Application ID
                "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4" // This is your Javascript key
            );

            const user = new Parse.User();
            // const user = new User();

            user.set("username", this.state.username);
            user.set("email", this.state.email);
            user.set("password", this.state.password);
            user.set("confirmPassword", this.confirmPassword);
            let successfulLogin = false;
            await user
                .signUp()
                .then((user) => {
                    if (typeof document !== "undefined")
                        document.write(`User signed up: ${JSON.stringify(user)}`);
                    console.log("User signed up", user);
                    successfulLogin = true;
                })
                .catch((error) => {
                    if (typeof document !== "undefined")
                        document.write(
                            `Error while signing up user: ${JSON.stringify(error)}`
                        );
                    console.error("Error while signing up user", error);
                });

            if (successfulLogin) {
                let sessionToken;
                let userId;
                let stocks;
                let cash;
                let following;
                let followingIds;
                await Parse.User.logIn(this.state.email, this.state.password).then((user) => {
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
                    followingIds = user.get('followingIds');

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
                    followingIds = [];
                }
                await SecureStore.setItemAsync('stockList', JSON.stringify(stocks)).then(() => {
                    console.log("Stocks: " + stocks)
                });
                await SecureStore.setItemAsync('followingList', JSON.stringify(following)).then(() => {
                    console.log("following: " + following)
                });

                await SecureStore.setItemAsync('followingIds', JSON.stringify(followingIds)).then(() => {
                })
            }
        }
    }

    validate = () => {
        let nameErrorMessage = "";
        let emailErrorMessage = "";
        let passwordErrorMessage = "";
        let confirmPasswordErrorMessage = "";
        if (!this.state.username) {
            this.setState({nameError: true});
            nameErrorMessage = "Username cannot be blank";
        } else {
            this.setState({nameError: false});
            nameErrorMessage = "";
        }
        if (!this.state.email.includes("@")){
          this.setState({emailError: true});
          emailErrorMessage = "Invalid email";
        }else{
          this.setState({emailError: false});
          emailErrorMessage = "";
        }
        let num = /^(?=.*[0-9]+$)/;
        let lower = /^(?=.[a-z]+$)/;
        let upper = /^(?=.[A-Z]+$)/;
        let charsNeeded = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])$/;
        //&& !lower.test(this.state.password) && !upper.test(this.state.password)
        //!num.test(this.state.password) && !lower.test(this.state.password) && !upper.test(this.state.password)
        if (!/\d/.test(this.state.password)) {
            this.setState({passwordError: true});
            passwordErrorMessage = "Password must include a number";
            console.log(this.state.password);
            console.log("bad password");
        } else {
            this.setState({passwordError: false});
            passwordErrorMessage = "";
        }
        /*if (this.state.confirmPassword && this.state.confirmPassword === this.state.password){
          this.setState({confirmPasswordError: false});
          passwordErrorMessage = "";
        }else{
          this.setState({confirmPasswordError: true});
          confirmPasswordErrorMessage = "Passwords must match";
          console.log(this.state.confirmPassword);
        }*/
        if (nameErrorMessage || emailErrorMessage || passwordErrorMessage /*|| confirmPasswordErrorMessage*/) {
            this.setState({nameErrorMessage, emailErrorMessage, passwordErrorMessage, /*confirmPasswordErrorMessage*/});
            return false;
        }
        return true;
    };

    render() {
        return (
            <KeyboardAwareScrollView
                style={{backgroundColor: "white"}}
                resetScrollToCoords={{x: 0, y: 0}}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
            >
                <View style={styles.header}>
                    <Text style={styles.welcomeWords}>Register for new account! </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.setInfo}>Username</Text>
                    <TextInput
                        style={[styles.input, this.state.nameError ? styles.errorBorder : null]}
                        placeholder="Your username"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            this.setState({username: text});
                            this.validate();
                        }}
                    />
                    {this.state.nameError ? (
                        <Text style={styles.error}>{this.state.nameErrorMessage}</Text>
                    ) : null}

                    <Text style={styles.setInfo}>Email</Text>
                    <TextInput
                        style={[styles.input, this.state.emailError ? styles.errorBorder : null]}
                        placeholder="Your email"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            this.setState({email: text});
                            this.validate();
                        }}
                    />
                    {this.state.emailError ? (
                        <Text style={styles.error}>{this.state.emailErrorMessage}</Text>
                    ) : null}

                    <Text style={styles.setInfo}>Password</Text>
                    <TextInput
                        style={[styles.input, this.state.passwordError ? styles.errorBorder : null]}
                        secureTextEntry={true}
                        placeholder="Your password"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            this.setState({password: text});
                            this.validate();
                        }}
                    />
                    {this.state.passwordError ? (
                        <Text style={styles.error}>{this.state.passwordErrorMessage}</Text>
                    ) : null}

                    <Text style={styles.setInfo}>Confirm Password</Text>
                    <TextInput
                        style={[styles.input, this.state.confirmPasswordError ? styles.errorBorder : null]}
                        secureTextEntry={true}
                        placeholder="Your password"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            this.setState({confirmPassword: text});
                            this.validate();
                        }}
                    />
                    {this.state.confirmPasswordError ? (
                        <Text style={styles.error}>{this.state.confirmPasswordErrorMessage}</Text>
                    ) : null}

                    <TouchableOpacity
                        style={styles.touchableButton}
                        onPress={() => this.createAccount()}
                    >
                        <Text style={styles.touchableText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },
    welcomeWords: {
        color: "#403f42",
        fontWeight: "bold",
        fontSize: 25,
        alignSelf: "center",
    },
    footer: {
        backgroundColor: "#889b73",
        flex: 4,
        width: widthfoot,
        paddingVertical: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    input: {
        borderWidth: 3,
        borderColor: "#EAFAF1",
        height: 40,
        padding: 10,
        marginHorizontal: 20,
        color: "#05375a",
        borderRadius: 5,
    },
    errorBorder: {
        borderWidth: 3,
        borderColor: "red",
        height: 40,
        padding: 10,
        marginHorizontal: 20,
        color: "#05375a",
        borderRadius: 5,
    },
    error: {
        color: "red",
        marginHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 12,
    },
    login: {
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        fontSize: 14,
    },
    setInfo: {
        color: "#05375a",
        marginHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 20,
    },
    touchableButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        elevation: 8,
        borderRadius: 10,
        padding: 12,
        marginLeft: widthfoot / 2,
        marginRight: 20,
        marginTop: 20,
    },
    touchableText: {
        fontSize: 18,
        color: "#008000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
});
