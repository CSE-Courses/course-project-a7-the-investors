import * as React from "react";
import { Text, View } from "react-native";

export default class LeaderBoardRow extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyling}> place </Text>
        <Text style={styles.textStyling}> username </Text>
        <Text style={styles.textStyling}> cash </Text>
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
