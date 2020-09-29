import * as React from "react";
import { Image, View, StyleSheet } from "react-native";

export default class Graph extends React.Component {
  render() {
    return (
      <View>
        <Image style={styles.image} source={require("./DemoGraph.png")}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "stretch",
    alignSelf: "center",
    width: "90%",
    height: 200,
  },
});
