import * as React from "react";
import { View, StyleSheet } from "react-native";
import LeaderBoard from "./LeaderBoard.js";
import DisplayCash from "./DisplayCash.js";
import Graph from "./Graph.js";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DisplayCash />
        {/* <Graph /> */}
        <LeaderBoard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#889b73"
  },
});
