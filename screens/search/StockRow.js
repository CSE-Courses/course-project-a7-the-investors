import * as React from 'react';
import {Text, View} from "react-native";
import {Component} from "react";

export default class StockRow extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyling}> Tickr </Text>
                <Text style={styles.textStyling}> +3.4% </Text>
                <Text style={styles.textStyling}> $34.23 </Text>
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
        alignSelf: 'center',
        height: 45,
        marginTop: 8
    },
    textStyling: {
        fontSize: 20
    }

};