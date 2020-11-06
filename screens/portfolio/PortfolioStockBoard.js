import * as React from "react";
import { Dimensions, Text, View, ScrollView } from "react-native";
import { Component } from "react";
import PortfolioStockRow from "./PortfolioStockRow";
import * as SecureStore from "expo-secure-store";

export default class PortFolioStockBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      amounts: [],
      totalBalance: 0,
      currentPrices: [],
    };
  }
  async componentDidMount() {
    await this.getStocks();
    //await this.getStockPrice();
  }

  async getStocks() {
    let userId;
    //accumulate balance in temporary variable
    var tempBalance = 0;

    await SecureStore.getItemAsync("userId").then((id) => {
      userId = JSON.parse(id);
      console.log(userId);
    });
    await SecureStore.getItemAsync("stockList").then((stocks) => {
      this.stockArray = JSON.parse(stocks);
      console.log("STOCKS" + stocks);
      const tempStocks = [];
      const tempAmounts = [];
      //go through array of stocks and amount of stock owned and seperate them into 2 different arrays
      for (var i = 0; i < this.stockArray.length; i++) {
        if (i % 2 == 0) {
          tempStocks.push(this.stockArray[i]);
        } else {
          tempAmounts.push(this.stockArray[i]);
        }
      }
      this.setState({
        stocks: tempStocks,
        amounts: tempAmounts,
      });
    });
    this.setState({
      totalBalance: tempBalance,
    });
    console.log("STOCK ARRAY: " + this.state.stocks);
    console.log("TEMP AMOUNTS: " + this.state.amounts);
    this.getStockPrice();
  }
  async getStockPrice() {
    const tempPrices = [];
    for (var i = 0; i < this.state.stocks.length; i++) {
        console.log(this.state.stocks[i]);
        await fetch(
        "https://finnhub.io/api/v1/quote?symbol=" +
          this.state.stocks[i] +
          "&token=bu317jf48v6pqlhnrjog"
      )
        .then((res) => res.json())
        .then(
          (result) => {
            //return current stock price
            tempPrices.push(result.c);
            console.log(result.c);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    this.setState({
      currentPrices: tempPrices,
    });
    console.log("current prices: " + this.state.currentPrices);
  }
  render() {
    const screenHeight = Dimensions.get("window").height;
    return (
      <View style={[styles.container, { height: screenHeight * 0.6 }]}>
        <View style={styles.boardContainer}>
          <View style={[styles.board, { height: screenHeight * 0.57 }]}>
            <ScrollView>
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
              <PortfolioStockRow />
            </ScrollView>
          </View>
        </View>
        <View>
          <View style={styles.cashContainer}>
            <View>
              <Text style={styles.cashLabel}>Invested:</Text>
            </View>
            <View>
              <Text style={styles.cashValue}> $43,312.32</Text>
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
    borderWidth: 3,
    borderRadius: 3,
    borderColor: "white",
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
    color: "#05375a",
  },
};
