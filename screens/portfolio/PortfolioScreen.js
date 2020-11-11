import * as React from "react";
import { Dimensions, Text, View, TextInput } from "react-native";
import { Component } from "react";
import AppHeader from "../../navigation/AppHeader";
import PortfolioStockBoard from "./PortfolioStockBoard";

export default class PortfolioScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <PortfolioStockBoard navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    //backgroundColor: "#889b73",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  cashContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  cashHeader: {
    flex: 1,
    flexDirection: "row",
  },
};
