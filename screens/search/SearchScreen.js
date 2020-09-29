import * as React from 'react';
import {Dimensions, Text, View} from "react-native";
import {Component} from "react";
import StockBoard from "./StockBoard";
import AppHeader from "../../navigation/AppHeader";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";
import StockSearch from "./StockSearch";

export default class SearchScreen extends Component {


    render() {

        return (

            <View style={styles.container} >

                <AppHeader/>
                <StockSearch/>
                <View style={styles.content}>
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


    },
    content: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    cashContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    cashHeader: {
        flex: 1,
        flexDirection: 'row',

    }


};