import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import LeaderBoardRow from "./LeaderBoardRow.js";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <View>
          <View style={{ backgroundColor: "grey" }}>
            <Text style={{ fontSize: 48, textAlign: "center" }}>
              Leaderboard
            </Text>
          </View>
          <ScrollView style={{ backgroundColor: "white" }}>
            <LeaderBoardRow />
            <LeaderBoardRow />
            <LeaderBoardRow />
            <LeaderBoardRow />
            <LeaderBoardRow />
            <LeaderBoardRow />
            <LeaderBoardRow />
            <LeaderBoardRow />
            <LeaderBoardRow />
            <LeaderBoardRow />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "80%",
    marginBottom: "30%",
    justifyContent: "center",
    alignContent: "center",
  },
  textStyling: {
    fontSize: 16,
  },
});
