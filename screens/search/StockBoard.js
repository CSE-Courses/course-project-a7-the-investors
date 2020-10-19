import * as React from "react";
import {
  Dimensions,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Component } from "react";
import StockRow from "./StockRow";
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
    };
  }

  async componentDidMount() {
    await this.getStarterStocks();
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
        <View style={styles.boardContainer}>
          <View style={[styles.board, { height: screenHeight * 0.55 }]}>
            <ScrollView>
              {this.state.row.map((list) => {
                return (
                  <StockRow
                    key={list[0]}
                    stockName={list[0]}
                    percentChange={list[1]}
                    stockCost={list[2]}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View>
          <View style={styles.cashContainer}>
            <View>
              <Text style={styles.cashLabel}>Cash:</Text>
            </View>
            <View>
              <Text style={styles.cashValue}> $15,235.53</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  boardContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  board: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "black",
    scrollEnabled: true,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.3,
    elevation: 2,
  },
  headers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 25,
    paddingLeft: 8,
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
    fontSize: 16,
  },
  cashValue: {
    fontSize: 43,
  },
  container: {
    marginTop: 10,
    alignItems: "center",
  },
  //for search
  buttonSign: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "33%",
    marginLeft: "20%",
  },
  searchInput: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#fff",
    width: "33%",
    borderRadius: 34,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
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
};
