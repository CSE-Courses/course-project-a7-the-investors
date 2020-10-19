import * as React from "react";
import { Text, View } from "react-native";
import { Component } from "react";

export default class StockRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyling}> {this.props.stockName} </Text>
        <Text style={styles.textStyling}>
          {JSON.stringify(this.props.percentChange).substring(0, 4)}%
        </Text>
        <Text style={styles.textStyling}> ${this.props.stockCost} </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "black",
    width: "95%",
    alignSelf: "center",
    height: 45,
    marginTop: 8,
  },
  textStyling: {
    fontSize: 20,
  },
};
