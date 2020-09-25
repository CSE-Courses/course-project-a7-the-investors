import * as React from 'react';
import {Text, View} from "react-native";
import {Component} from "react";

export default class StockRow extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text> Tickr </Text>
                <Text> Tickr </Text>
                <Text> Tickr </Text>
            </View>
        );
    }


}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'black',
        width: '95%',
        alignSelf: 'center'
    },

};