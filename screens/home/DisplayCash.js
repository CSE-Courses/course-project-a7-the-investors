import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as SecureStore from "expo-secure-store";

export default class DisplayCash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cash: 0,
    };
  }
  async componentDidMount() {
    await this.getCash();
  }
  async getCash() {
    let cash;
    let userId;
    await SecureStore.getItemAsync("userId").then((id) => {
      userId = JSON.parse(id);
      console.log("userId: " + userId);
    });
    await SecureStore.getItemAsync("cash").then((storedCash) => {
      cash = storedCash;
      console.log("cash amount: " + cash);
    })
    .catch((error) => {
      document.write(`Error retrieving cash.`);
      console.error("Error retrieving cash", error);
    });
    this.setState({ cash: cash});
  }

  render() {
    return (
      <SafeAreaView style={styles.boardContainer}>
        <View>
          <Text style={styles.cashLabel}>Cash:</Text>
          <Text style={styles.cashValue}> ${this.state.cash} </Text>
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
    color: "#05375a",
  },
});
