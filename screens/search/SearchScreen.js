import * as React from 'react';
import {Dimensions, Text, View} from "react-native";
import {Component} from "react";
import StockBoard from "./StockBoard";
import AppHeader from "../../navigation/AppHeader";

export default class SearchScreen extends Component {


    render() {
        const screenHeight = Dimensions.get('window').height;

        return (

            <View>

                <AppHeader/>
                <View style={styles.container}>


                    <StockBoard/>
                </View>
            </View>

        );
    };


};

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },


};