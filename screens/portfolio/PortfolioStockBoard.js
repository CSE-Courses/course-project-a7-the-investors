import * as React from 'react';
import {Dimensions, Text, View, ScrollView} from "react-native";
import {Component} from "react";
import PortfolioStockRow from "./PortfolioStockRow";

export default class PortFolioStockBoard extends Component {


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
                            <Text style={styles.cashValue}> $43,312.32</Text>
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


