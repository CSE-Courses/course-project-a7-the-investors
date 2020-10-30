import * as React from "react";
import { Dimensions, Text, View, TextInput } from "react-native";
import { Component } from "react";
import StockBoard from "./StockBoard";
import AppHeader from "../../navigation/AppHeader";

export default class StockTransaction extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.route.params.item)
        return (
            <View style={styles.container}>
                <AppHeader />
                <View style={styles.content}>

                </View>
            </View>
        );
    }
}
