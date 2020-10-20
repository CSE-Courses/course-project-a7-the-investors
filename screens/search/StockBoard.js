import * as React from 'react';
import {Dimensions, Text, View, ScrollView} from "react-native";
import {Component} from "react";
import StockRow from "./StockRow";

export default class StockBoard extends Component {
    constructor(props) {
        super(props);
        this.state ={
            stocks: ['AAPL', 'TWTR', 'FB', 'NFLX', 'MSFT','F','GPRO','SBUX','BABA'],
            cost: []
        }


    }

    async componentDidMount() {


        await this.getStarterStocks()
    }



    async getStarterStocks() {

        const stockCost = [];
        for (const stock of this.state.stocks) {
            await fetch('https://finnhub.io/api/v1/quote?symbol=' + stock + '&token=bu317jf48v6pqlhnrjog')
                .then(res => res.json())
                .then(
                    (result) => {
                        //console.log(result);
                        console.log(result.c);
                        stockCost.push([stock,result.c])
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log(error)
                    });
        }
        this.setState({
            cost: stockCost

        })

        console.log("STOCK COST")
        console.log(stockCost)
        console.log("RECHED")
        console.log("REACHED" + this.state.cost)


//
//         socket.addEventListener('open', function (event) {
//             socket.send(JSON.stringify({'type': 'subscribe', 'symbol': 'AAPL'}))
//
//         });
//
// // Listen for messages
//         socket.addEventListener('message', function (event) {
//             console.log('Message from server ', event.data);
//         });
//

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
                        <Text> Price</Text>
                    </View>

                </View>
                <View style={styles.boardContainer}>



                    <View style={[styles.board, {height: screenHeight * .57}]}>
                        <ScrollView>

                            {this.state.cost.map(list => {
                                return <StockRow key={list[0]} stockName={list[0]} stockCost={list[1]}/>
                            })}

                        </ScrollView>
                    </View>
                </View>
                <View>
                    <View style={styles.cashContainer}>
                        <View>
                            <Text style={styles.cashLabel}>Cash:</Text>

                        </View>
                        <View>
                            <Text style={styles.cashValue}> $15,235.53</Text>
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
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'black',
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
        fontSize: 43
    }

};