import * as React from 'react';
import {Text, View} from "react-native";
import {Component} from "react";

export default class PortfolioStockRow extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyling}> Tickr </Text>
                <Text style={styles.textStyling}> -2.6% </Text>
                <Text style={styles.textStyling}> 53 </Text>
                <Text style={styles.textStyling}> $3.32 </Text>
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
        borderColor: 'white',
        width: '95%',
        alignSelf: 'center',
        height: 45,
        marginTop: 8
    },
    textStyling: {
        fontSize: 20
    }

};









