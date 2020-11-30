import * as React from "react";
import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";
import { Component } from "react";
import StockBoard from "./StockBoard";
import AppHeader from "../../navigation/AppHeader";
import * as SecureStore from "expo-secure-store";
import Parse from "parse/react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class StockTransaction extends Component {
  //TODO: calculate amount of money left after buying do a check if they have enough funds to buy
  stockArray;

  constructor(props) {
    super(props);
    this.state = {
      cash: 0,
      amountOfStockTransaction: 0,
      volumeCost: 0,
      amountOfStockOwned: 0,
      insufficientFunds: false,
    };
  }

  async componentDidMount() {
    await this.getCashAndStocks();
  }

  async getCashAndStocks() {
    let cash;
    let userId;
    await SecureStore.getItemAsync("cash").then((storedCash) => {
      cash = storedCash;
      console.log("THIS IS THE TOKEN" + cash);
    });
    await SecureStore.getItemAsync("userId").then((id) => {
      userId = JSON.parse(id);
      console.log(userId);
    });

    await SecureStore.getItemAsync("stockList").then((stocks) => {
      this.stockArray = JSON.parse(stocks);
      console.log("STOCKS" + stocks);
    });

    if (this.stockArray === undefined || this.stockArray === null) {
      console.log("UNDEFINED ArRAy");
      this.stockArray = [];
    } else {
      let indexOfStock = this.stockArray.indexOf(
        this.props.route.params.stockName
      );
      if (indexOfStock > -1) {
        this.setState({
          amountOfStockOwned: parseInt(this.stockArray[indexOfStock + 1]),
        });
      }
    }
    console.log("STOCK ARRAY: " + this.stockArray);

    console.log("reacheddddd");

    this.setState({ cash: parseFloat(cash) });
  }

  calculateCost(evt) {
    let tempVolumeCost =
      parseFloat(this.props.route.params.stockCost) * parseFloat(evt);
    console.log("EVT REACHED");
    if (!isNaN(tempVolumeCost)) {
      this.setState({
        amountOfStockTransaction: parseFloat(evt),
        volumeCost: tempVolumeCost.toFixed(2),
      });
    } else {
      this.setState({
        amountOfStockTransaction: 0,
        volumeCost: 0,
      });
    }
  }

  stockOwnedRender() {
    if (this.state.insufficientFunds) {
      return (
        <View style={styles.input}>
          <Text> INSUFFICIENT FUNDS</Text>
          <Text style={{fontSize: 20}}> Cost of Volume: {this.state.volumeCost}</Text>
          <Text style={{fontSize: 20}}> Cash: {this.state.cash}</Text>
          <Text style={{fontSize: 20}}> Currently Own: {this.state.amountOfStockOwned}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.input}>
          <Text style={{fontSize: 20}}> Cost of Volume: {this.state.volumeCost}</Text>
          <Text style={{fontSize: 20}}> Cash: {this.state.cash}</Text>
          <Text style={{fontSize: 20}}> Currently Own: {this.state.amountOfStockOwned}</Text>
        </View>
      );
    }
  }

  async confirmTransaction(buy) {
    

    if (this.state.amountOfStockTransaction < 0) {
      return;
    }
    //true = buy, false = sell
    const stockToBuy = this.props.route.params.stockName.toUpperCase();//this is to stop duplicate entries like aalp & AALP
    let indexOfStock = this.stockArray.indexOf(stockToBuy);
    let updatedCash = 0;
    //Make stock to buy negative in order to sell and check if they are selling a bound of what they own
    console.log(this.state);
    if (
      !buy &&
      this.state.amountOfStockOwned > 0 &&
      this.state.amountOfStockOwned >= this.state.amountOfStockTransaction
    ) {
      let selling = this.state.amountOfStockTransaction * -1;
      await this.setState({
        amountOfStockTransaction: selling,
      });
      updatedCash = parseFloat(this.state.volumeCost) + this.state.cash;
      Alert.alert("You just sold "+this.state.amountOfStockTransaction +" of "+stockToBuy,
      "  ",
      [
        { text: "OK", onPress: () => console.log("so what")}
      ],
      { cancelable: false });
      console.log("SELLING : " + selling);
      console.log("SELLING STATE: " + this.state.amountOfStockTransaction);
      //If selling more than owned do nothing
    } else if (!buy) {
        Alert.alert("You Don't Own That Many Stocks",
        "  ",
        [
          { text: "OK", onPress: () => console.log("so what")}
        ],
        { cancelable: false });
      return;
    }
    //If buying more than funds do nothing
    if (buy && this.state.volumeCost > this.state.cash) {
        Alert.alert("Sorry You Don't Have Enough Money",
        "You may consider getting a day job",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false });
      return;
    } else if (buy) {
      updatedCash = this.state.cash - parseFloat(this.state.volumeCost);
      Alert.alert("You just bought "+this.state.amountOfStockTransaction +" of "+stockToBuy,
      "  ",
      [
        { text: "OK", onPress: () => console.log("so what")}
      ],
      { cancelable: false });
    }

    //If stock array includes array update value in place
    if (indexOfStock > -1) {
      console.log("AMOUNT OF STOCK: " + this.state.amountOfStockTransaction);
      this.stockArray[indexOfStock + 1] =
        parseInt(this.stockArray[indexOfStock + 1]) +
        parseInt(this.state.amountOfStockTransaction);
    } else {
      //If not add ticker and amount buying
      this.stockArray.push(stockToBuy);
      this.stockArray.push(this.state.amountOfStockTransaction);
      indexOfStock = this.stockArray.length - 2;
    }

    //Update total of amount of stock owned
    await this.setState({
      amountOfStockOwned: this.stockArray[indexOfStock + 1],
      cash: updatedCash,
    });

    Parse.setAsyncStorage(AsyncStorage);
    Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
    Parse.initialize(
      "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz", // This is your Application ID
      "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4" // This is your Javascript key
    );

    let sessionToken;

    SecureStore.getItemAsync("sessionToken").then((token) => {
      sessionToken = token;
      console.log("THIS IS THE TOKEN" + token);
    });

    const User = new Parse.User();
    const query = new Parse.Query(User);

    Parse.User.me(sessionToken)
      .then((user) => {
        const currentUser = Parse.User.current();
        let ownedStocks = this.stockArray;
        currentUser.set("stocks", ownedStocks);
        currentUser.set("cash", updatedCash);
        user
          .save()
          .then((response) => {
            if (typeof document !== "undefined")
              document.write(`Updated user: ${JSON.stringify(response)}`);
            //console.log("Updated user", response);
            //this.setState({imageUrl: URL})
          })
          .catch((error) => {
            if (typeof document !== "undefined")
              document.write(
                `Error while updating user: ${JSON.stringify(error)}`
              );
            console.error("Error while updating user", error);
          });

        if (typeof document !== "undefined")
          document.write(
            `Current logged in user: ${JSON.stringify(currentUser)}`
          );
        console.log("Current logged in user", currentUser);
      })
      .catch((error) => {
        if (typeof document !== "undefined")
          document.write(
            `Error while logging in user: ${JSON.stringify(error)}`
          );
        console.error("Error while logging in user", error);
      });

    //Update array of stocks owned
    await SecureStore.setItemAsync(
      "stockList",
      JSON.stringify(this.stockArray)
    ).then(() => {
      //console.log("SET ITEM: " + this.stockArray)
    });

    await SecureStore.setItemAsync("cash", JSON.stringify(updatedCash)).then(
      () => {
        //console.log("SET ITEM: " + this.stockArray)
      }
    );
  }

  render() {
    let percentage;

    if (this.props.route.params.percentChange > 0) {
      percentage = (
        <Text style={styles.positive}>
          {JSON.stringify(this.props.route.params.percentChange).substring(
            0,
            4
          )}
          %
        </Text>
      );
    } else {
      percentage = (
        <Text style={styles.negative}>
          {JSON.stringify(this.props.route.params.percentChange).substring(
            0,
            4
          )}
          %
        </Text>
      );
    }

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "white" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Text style={styles.textStyling}>
              {" "}
              Symbol: {this.props.route.params.stockName}{" "}
            </Text>

            <Text style={styles.textStyling}>
              {" "}
              Current Price: ${this.props.route.params.stockCost}{" "}
            </Text>

            <Text style={styles.textStyling}>
              Percent Change Today: {percentage}{" "}
            </Text>

            <View style={styles.input}>
              <TextInput
                keyboardType="numeric"
                placeholder={"Input amount to trade"}
                onChange={(text) => {
                  this.calculateCost(text.nativeEvent.text);
                }}
              ></TextInput>
            </View>
            {this.stockOwnedRender()}

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.buttonBuy}
                onPress={() => this.confirmTransaction(true)}
              >
                <Text style= {styles.buttonWords}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSell}
                onPress={() => this.confirmTransaction(false)}
              >
                <Text style= {styles.buttonWords}>Sell</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "white",
    width: "95%",
    alignSelf: "center",
    height: 20,
    marginTop: 8,
  },
  textStyling: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  positive: {
    fontSize: 20,
    color: "#008000",
    flex: 1,
  },
  negative: {
    fontSize: 20,
    color: "#800000",
    flex: 1,
  },
  controller: {
    flex: 1,
    flexDirection: "column",
    width: "20%",
    alignItems: "center",
  },
  input: {
    flex: 1 / 2,
    paddingTop: 50,
    paddingBottom: 10,

    alignItems: "center",
  },
  buttonBuy: {
    elevation: 8,
    backgroundColor: "#008000",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 20,
  },
  buttonSell: {
    elevation: 8,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 20,
  },
  buttonWords: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttons: {
    flex: 1 / 4,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "white",
    width: "95%",
    alignSelf: "center",
    
    marginTop: 8,
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
};
