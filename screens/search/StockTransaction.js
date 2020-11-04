import * as React from "react";
import {Dimensions, Text, View, TextInput, TouchableOpacity, AsyncStorage} from "react-native";
import {Component} from "react";
import StockBoard from "./StockBoard";
import AppHeader from "../../navigation/AppHeader";
import * as SecureStore from "expo-secure-store";
import Parse from "parse/react-native";

export default class StockTransaction extends Component {

    //TODO: calculate amount of money left after buying do a check if they have enough funds to buy
    stockArray;

    constructor(props) {
        super(props);
        this.state = {
            cash: 0,
            amountOfStock: 0,
            volumeCost: 0,
            amountOfStockOwned: 0,
        }
    }

    async componentDidMount() {
        await this.getCashAndStocks()
    }

    async getCashAndStocks() {
        let cash;
        let userId;
        await SecureStore.getItemAsync("cash").then((storedCash) => {
            cash = storedCash;
            console.log("THIS IS THE TOKEN" + cash);
        });
        await SecureStore.getItemAsync('userId').then((id) => {
            userId = JSON.parse(id);
            console.log(userId);
        });

        await SecureStore.getItemAsync('stockList').then((stocks) => {
            this.stockArray = JSON.parse(stocks);
            console.log("STOCKS" + stocks)

        });

        if (this.stockArray === undefined || this.stockArray === null) {
            console.log("UNDEFINED ArRAy")
            this.stockArray = [];
        }else{
            let indexOfStock = this.stockArray.indexOf(this.props.route.params.stockName);
            if ( indexOfStock> -1) {
                this.setState({
                    amountOfStockOwned: this.stockArray[indexOfStock + 1]
                });
            }
        }
        console.log("STOCK ARRAY: " + this.stockArray)


        console.log("reacheddddd")


        this.setState({cash: cash})

    }

    calculateCost(evt) {
        console.log(evt)
        console.log("REACHED")
        let tempVolumeCost = parseInt(this.props.route.params.stockCost) * parseInt(evt);

        this.setState({
            amountOfStock: evt,
            volumeCost: tempVolumeCost
        });
    }

    async confirmBuyStock() {
        const stockToBuy = this.props.route.params.stockName;
        let indexOfStock = this.stockArray.indexOf(stockToBuy);
        if (this.stockArray.includes(stockToBuy)) {

            this.stockArray[indexOfStock + 1] = parseInt(this.stockArray[indexOfStock + 1]) + parseInt(this.state.amountOfStock);
        } else {
            this.stockArray.push(stockToBuy);
            this.stockArray.push(this.state.amountOfStock)
            indexOfStock = this.stockArray.length - 2;
        }
        this.setState({
            amountOfStockOwned: this.stockArray[indexOfStock + 1]
        })

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

        Parse.User.me(sessionToken)
            .then((user) => {
                const currentUser = Parse.User.current();
                let ownedStocks = this.stockArray;
                currentUser.set("stocks", ownedStocks);
                user
                    .save()
                    .then((response) => {
                        if (typeof document !== "undefined")
                            document.write(`Updated user: ${JSON.stringify(response)}`);
                        console.log("Updated user", response);
                        //this.setState({imageUrl: URL})
                    })
                    .catch((error) => {
                        if (typeof document !== "undefined")
                            document.write(
                                `Error while updating user: ${JSON.stringify(error)}`
                            );
                        console.error("Error while updating user", error);
                    });

                if (typeof document !== "undefined")
                    document.write(
                        `Current logged in user: ${JSON.stringify(currentUser)}`
                    );
                console.log("Current logged in user", currentUser);
            })
            .catch((error) => {
                if (typeof document !== "undefined")
                    document.write(
                        `Error while logging in user: ${JSON.stringify(error)}`
                    );
                console.error("Error while logging in user", error);
            });

        await SecureStore.setItemAsync('stockList', JSON.stringify(this.stockArray)).then(() => {
            console.log("SET ITEM: " + this.stockArray)
        })
    }

    render() {
        console.log(this.props.route.params.item)

        let percentage;

        if (this.props.route.params.percentChange > 0) {
            percentage = <Text style={styles.positive}>
                {JSON.stringify(this.props.route.params.percentChange).substring(0, 4)}%
            </Text>
        } else {
            percentage = <Text style={styles.negative}>
                {JSON.stringify(this.props.route.params.percentChange).substring(0, 4)}%

            </Text>

        }

        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.textStyling}> {this.props.route.params.stockName} </Text>
                        {percentage}
                        <Text style={styles.textStyling}> ${this.props.route.params.stockCost} </Text>
                    </View>
                    <View style={styles.controller}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder={"Input amount"}
                            onChange={(text) => {
                                this.calculateCost(text.nativeEvent.text);
                            }}>
                        </TextInput>
                        <TouchableOpacity style={styles.buttonBuy}
                        onPress={() => this.confirmBuyStock()}>
                            <Text>
                                Buy
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text> Cost of Volume: {this.state.volumeCost}</Text>
                        <Text> Cash: {this.state.cash}</Text>
                        <Text> Currently Own: {this.state.amountOfStockOwned}</Text>
                    </View>
                </View>
            </View>


        );

    }
}


const styles = {
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'

    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "white",
        width: "95%",
        alignSelf: "center",
        height: 45,
        marginTop: 8,
    },
    textStyling: {
        fontSize: 20,
        flex: 1,
    },
    positive: {
        fontSize: 20,
        color: "#008000",
        flex: 1,
    },
    negative: {
        fontSize: 20,
        color: "#800000",
        flex: 1,
    },
    controller: {
        flex: 1,
        flexDirection: 'column',
        width: '20%',
        alignItems: 'center',

    },
    buttonBuy: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginTop: 20,


    },
};