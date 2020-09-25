import * as React from 'react';
import {Dimensions, Text, View, ScrollView} from "react-native";
import {Component} from "react";
import StockRow from "./StockRow";

export default class StockBoard extends Component {


    render() {
        const screenHeight = Dimensions.get('window').height;
        console.log(screenHeight);
        return (
            <View style={[styles.container, {height: screenHeight * .6}]}>
                <View style={styles.headers}>
                    <Text> Name</Text>
                    <Text> Change</Text>
                    <Text> Price</Text>
                </View>
                <View style={[styles.board, {height: screenHeight * .57}]}>
                    <ScrollView>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                        <StockRow/>
                    </ScrollView>


                </View>
            </View>
        );
    };


};

const styles = {
    container: {
        width: '90%',


    },
    board: {
        width: "90%",
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
        shadowRadius: 1.41,

        elevation: 2,


    },
    headers: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        paddingRight: 4
    }

};