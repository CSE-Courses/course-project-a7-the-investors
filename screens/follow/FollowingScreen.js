import * as React from "react";
import { View } from "react-native";
import FollowBoard from "./FollowBoard.js";

export default class FollowingScreen extends React.Component {
  render() {
    return (
      <View>
        <FollowBoard navigation={this.props.navigation}/>
      </View>
    );
  }
}
