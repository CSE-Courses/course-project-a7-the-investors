import * as React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class LeaderBoardRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.textStyling}> {this.props.place} </Text>
          <Text style={styles.textStyling}> {this.props.username} </Text>
          <Text style={styles.textStyling}> ${this.props.cash} </Text>
        </View>
      </TouchableOpacity>
    );
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
    flex: 1,
  },
};
