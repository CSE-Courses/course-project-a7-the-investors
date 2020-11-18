import * as React from "react";
import { View } from "react-native";
import LeaderBoard from "./LeaderBoard.js";
import DisplayCash from "./DisplayCash.js";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <LeaderBoard />
        <DisplayCash navigation={this.props.navigation} />
      </View>
    );
  }
}
