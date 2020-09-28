import * as React from "react";
import { Image } from "react-native";

export default class Graph extends React.Component {
  render() {
    return <Image source={require("./DemoGraph.PNG")}></Image>;
  }
}
