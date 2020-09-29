import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("./profile-icon.png")} />
        <Text style={styles.text}>{"\n"}Username: ExampleName</Text>
        <Text style={styles.text}>{"\n"}Email: user@example.com</Text>
        <Text style={styles.text}>{"\n"}Member since 9/28/2020</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00bbee",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    color: "#000",
  },
  image: {
    width: 150,
    height: 150,
  },
});
