import * as React from "react";
import { Text, View } from "react-native";
import { Component } from "react";

export default class StockRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.percentChange > 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.textStyling}> {this.props.stockName} </Text>
          <Text style={styles.positive}>
            {JSON.stringify(this.props.percentChange).substring(0, 4)}%
          </Text>
          <Text style={styles.textStyling}> ${this.props.stockCost} </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.textStyling}> {this.props.stockName} </Text>
          <Text style={styles.negative}>
            {JSON.stringify(this.props.percentChange).substring(0, 4)}%
          </Text>
          <Text style={styles.textStyling}> ${this.props.stockCost} </Text>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "white",
    width: "95%",
    alignSelf: "center",
    height: 45,
    marginTop: 8,
  },
  textStyling: {
    fontSize: 20,
    flex:1,
  },
  positive: {
    fontSize: 20,
    color: "#008000",
    flex:1,
  },
  negative: {
    fontSize: 20,
    color: "#800000",
    flex:1,
  },
};
