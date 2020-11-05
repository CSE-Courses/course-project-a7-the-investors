import * as React from 'react';
import {Dimensions, Text, View, ScrollView} from "react-native";
import {Component} from "react";
import PortfolioStockRow from "./PortfolioStockRow";
import * as SecureStore from "expo-secure-store";
import { AsyncStorage } from "react-native";
import Parse from "parse/react-native.js";

export default class PortFolioStockBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioValue: NaN
        };
    }

    //Fetches a user's portfolio value from DB
    async getPortfolioValue() {
        Parse.setAsyncStorage(AsyncStorage);
        Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
        Parse.initialize(
            "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz", // This is your Application ID
            "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4" // This is your Javascript key
        );

        let sessionToken;

        SecureStore.getItemAsync("sessionToken").then((token) => {
            sessionToken = token;
            console.log("THIS IS THE TOKEN" + token);
        });

        const User = new Parse.User();
        const query = new Parse.Query(User);

        let value;
        await Parse.User.me(sessionToken)
            .then((user) => {
                const currentUser = Parse.User.current();

                console.log("LOOOGGGED" + currentUser.get('portfolioValue'));

                value = currentUser.get('portfolioValue');
            })
            .catch((error) => {
                if (typeof document !== "undefined")
                    document.write(
                        `Error while logging in user: ${JSON.stringify(error)}`
                    );
                console.error("Error while logging in user", error);
            });

            if (value !== undefined || !value !== NaN) {
                console.log("REACHED::: " + value);
                console.log("REACHED")

                this.setState({portfolioValue: value})
      
            }
    }

    render() {
        const screenHeight = Dimensions.get('window').height;
        console.log(screenHeight);
        return (
            <View style={[styles.container, {height: screenHeight * .6}]}>
                <View style={styles.headers}>
                    <View>
                        <Text> Name</Text>
                    </View>
                    <View>
                        <Text> Change</Text>
                    </View>
                    <View>
                        <Text> Own</Text>
                    </View>
                    <View>
                        <Text> Price</Text>
                    </View>

                </View>
                <View style={styles.boardContainer}>


                    <View style={[styles.board, {height: screenHeight * .57}]}>
                        <ScrollView>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                            <PortfolioStockRow/>
                        </ScrollView>
                    </View>
                </View>
                <View>
                    <View style={styles.cashContainer}>
                        <View>
                            <Text style={styles.cashLabel}>Invested:</Text>

                        </View>
                        <View>
                            <Text style={styles.cashValue}> $10,000.00</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };


};

const styles = {

    boardContainer: {
        marginTop: 20,
        alignItems: 'center',


    },
    board: {
        borderWidth: 3,
        borderRadius: 3,
        borderColor: 'white',
        scrollEnabled: true,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.3,
        elevation: 2,
    },

    headers: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 25,
        paddingLeft: 8
    },
    cashContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '75%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15
    },
    cashLabel: {
        fontSize: 16
    },
    cashValue: {
        fontSize: 43,
        color: "#05375a"
    }

};


