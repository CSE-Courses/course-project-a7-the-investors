import * as React from "react";
import { View } from "react-native";
import LeaderBoard from "./LeaderBoard.js";
import DisplayCash from "./DisplayCash.js";
import Switch from "./Switch.js";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Switch />
        <LeaderBoard />
        <DisplayCash navigation={this.props.navigation} />
      </View>
    );
  }
}
