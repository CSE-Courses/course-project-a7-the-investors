import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

export default class DisplayCash extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.boardContainer}>
        <View>
          <Text style={styles.cashLabel}>Cash:</Text>
          <Text style={styles.cashValue}> $15,235.53</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  boardContainer: {
    marginTop: "10%",
    alignItems: "center",
  },
  cashContainer: {
    flex: 1,
    flexDirection: "column",
    width: "75%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
  },
  cashLabel: {
    textAlign: "center",
    fontSize: 16,
  },
  cashValue: {
    fontSize: 60,
  },
});
