import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Component } from "react";

export default class PortfolioStockRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.percentChange > 0) {
      return (
        <TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.textStyling}> {this.props.stock} </Text>
            <Text style={styles.positive}>
              {" "}
              {JSON.stringify(this.props.percentChange).substring(0, 4)}%{" "}
            </Text>
            <Text style={styles.textStyling}> {this.props.amount} </Text>
            <Text style={styles.textStyling}>
              {" "}
              ${Math.round((this.props.total + Number.EPSILON) * 100) /
                100}{" "}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.textStyling}> {this.props.stock} </Text>
            <Text style={styles.negative}>
              {" "}
              {JSON.stringify(this.props.percentChange).substring(0, 4)}%{" "}
            </Text>
            <Text style={styles.textStyling}> {this.props.amount} </Text>
            <Text style={styles.textStyling}>
              {" "}
              ${Math.round((this.props.total + Number.EPSILON) * 100) /
                100}{" "}
            </Text>
          </View>
        </TouchableOpacity>
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
    borderColor: "grey",
    width: "95%",
    alignSelf: "center",
    height: 45,
    marginTop: 8,
  },
  textStyling: {
    fontSize: 20,
  },
  positive: {
    fontSize: 20,
    color: "#008000",
    //flex: 1,
  },
  negative: {
    fontSize: 20,
    color: "#800000",
    //flex: 1,
  },
};
