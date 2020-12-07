import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onGlobal: true,
    };
  }
  render() {
    if (this.state.onGlobal) {
      return (
        <SafeAreaView style={styles.boardContainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.buttonStyleGray}>
              <Text style={styles.buttonWords}>Global</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyleWhite}
              onPress={() => this.setState({ onGlobal: false })}
            >
              <Text style={styles.buttonWords}>Following</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.boardContainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.buttonStyleWhite}
            onPress={() => this.setState({ onGlobal: true })}>
              <Text style={styles.buttonWords}>Global</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyleGray}>
              <Text style={styles.buttonWords}>Following</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  boardContainer: {
    marginTop: "10%",
    alignItems: "center",
  },
  buttonStyleGray: {
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "35%",
    textAlign: "center",
  },
  buttonStyleWhite: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "35%",
    textAlign: "center",
  },
  buttonWords: {
    fontSize: 18,
    color: "#008000",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
