import * as React from "react";
import {
  Dimensions,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Component } from "react";
import StockRow from "./StockRow";
import * as SecureStore from "expo-secure-store";

const screenHeight = Dimensions.get("window").height;

export default class StockBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [
        "AAPL",
        "TWTR",
        "FB",
        "NFLX",
        "MSFT",
        "F",
        "GPRO",
        "SBUX",
        "BABA",
      ],
      row: [],
      change: [],
      cash: 0,
    };
  }

  async _unsubscribe() {}

  async componentDidMount() {
    //Regather data when page is refreshed
    await this.getStarterStocks();
    await this.getCash();
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getCash();
    });
    // do something
  }

  async getCash() {
    let tempCash;
    let userId;
    await SecureStore.getItemAsync("userId").then((id) => {
      userId = JSON.parse(id);
      console.log("userId: " + userId);
    });
    await SecureStore.getItemAsync("cash")
      .then((storedCash) => {
        tempCash = storedCash;
        console.log("cash amount: " + tempCash);
      })
      .catch((error) => {
        document.write(`Error retrieving cash.`);
        console.error("Error retrieving cash", error);
      });
    this.setState({ cash: tempCash });
  }

  async getStarterStocks() {
    //temporary row hold stock name, percent change, and current price
    const tempRow = [];
    for (const stock of this.state.stocks) {
      await fetch(
        "https://finnhub.io/api/v1/quote?symbol=" +
          stock +
          "&token=bu317jf48v6pqlhnrjog"
      )
        .then((res) => res.json())
        .then(
          (result) => {
            //.c = current price, .pc = previous close, .o = opening price
            tempRow.push([
              stock,
              ((result.c - result.pc) / result.pc) * 100,
              result.c,
            ]);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    this.getCash();
    this.setState({
      row: tempRow,
    });
    console.log("currently viewed stock(s): " + this.state.row);

    //
    //         socket.addEventListener('open', function (event) {
    //             socket.send(JSON.stringify({'type': 'subscribe', 'symbol': 'AAPL'}))
    //
    //         });
    //
    // // Listen for messages
    //         socket.addEventListener('message', function (event) {
    //             console.log('Message from server ', event.data);
    //         });
    //
  }

  render() {
    return (
      <View style={[styles.container, { height: screenHeight * 0.6 }]}>
        <View style={styles.row}>
          {/* render new input as stock search */}
          <TextInput
            style={styles.searchInput}
            maxLength={4}
            placeholder={"Search..."}
            onChangeText={(text) => {
              this.setState({ stocks: [text] });
            }}
          ></TextInput>
          <TouchableOpacity
            onPress={() => this.getStarterStocks()}
            style={styles.buttonSign}
          >
            <Text style={styles.buttonWords}>VIEW</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.boardContainer}>
          <ScrollView style={styles.board}>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Stocks</Text>
            </View>
            {this.state.row.map((list) => {
              return (
                <StockRow
                  key={list[0]}
                  stockName={list[0]}
                  percentChange={list[1]}
                  stockCost={list[2]}
                  navigation={this.props.navigation}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
        <View>
          <View style={styles.cashContainer}>
            <View>
              <Text style={styles.cashLabel}>Cash:</Text>
            </View>
            <View>
              <Text style={styles.cashValue}>
                {" "}
                ${Math.round(this.state.cash * 100) / 100}{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  boardContainer: {
    alignItems: "center",
    marginTop: "5%",
    height: "90%",
    marginBottom: "5%",
    width: "85%",
  },
  board: {
    flex: 1,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  container: {
    //marginTop: 10,
    alignItems: "center",
  },
  cashContainer: {
    flex: 1,
    flexDirection: "column",
    width: "75%",
    alignItems: "center",
    alignSelf: "center",
    //marginTop: "5%",
  },
  cashLabel: {
    fontSize: 16,
  },
  cashValue: {
    fontSize: 43,
    color: "#05375a",
  },
  //for search
  buttonSign: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "33%",
    marginLeft: "20%",
    marginTop: "5%",
  },
  searchInput: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#fff",
    width: "33%",
    borderRadius: 34,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    marginTop: "5%",
  },
  buttonWords: {
    fontSize: 18,
    color: "#008000",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
  },
  banner: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "grey",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#889b73",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bannerText: {
    fontSize: 48,
    textAlign: "center",
  },
};
