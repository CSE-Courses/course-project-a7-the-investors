import * as React from 'react';
import {Dimensions, Text, View, StyleSheet,TextInput} from "react-native";
import {Component} from "react";
import StockBoard from "./StockBoard";
import AppHeader from "../../navigation/AppHeader";

export default class StockSearch extends Component {


    render() {

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}   defaultValue= "  Search" >  </TextInput>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems:'center'

    },
    input: {
        borderColor: '#7a42f4',
        backgroundColor: 'grey',
        width: '33%',
        height: 25,
        borderRadius:34,
        borderTopLeftRadius: 34,
        borderTopRightRadius: 34,
        

    }

})