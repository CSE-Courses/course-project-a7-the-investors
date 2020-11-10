import * as React from "react";
import { Dimensions, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Component } from "react";
import PortfolioStockRow from "./PortfolioStockRow";
import * as SecureStore from "expo-secure-store";

export default class PortFolioStockBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      amounts: [],
      //amounts * current prices
      stockTotals: [],
      //for populating PortfolioStockRow
      row: [],
      //total portfolio value
      portfolioTotal: 0,
    };
  }
  async componentDidMount() {
    await this.getStocks();
  }

  async getStocks() {
    let userId;
    await SecureStore.getItemAsync("userId").then((id) => {
      userId = JSON.parse(id);
      console.log(userId);
    });
    await SecureStore.getItemAsync("stockList").then((stocks) => {
      this.stockArray = JSON.parse(stocks);
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
    console.log("STOCKS: " + this.state.stocks);
    console.log("AMOUNTS: " + this.state.amounts);
    this.getStockPrice();
  }
  async getStockPrice() {
    const tempPrices = [];
    const tempRow = [];
    for (var i = 0; i < this.state.stocks.length; i++) {
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
            //for use in Portfolio Stock Rows
            tempRow.push([
              this.state.stocks[i],
              ((result.c - result.pc) / result.pc) * 100,
              this.state.amounts[i],
              result.c * this.state.amounts[i],
            ]);
            //add to total
            this.state.portfolioTotal += result.c * this.state.amounts[i];
          },
          (error) => {
            console.log(error);
          }
        );
    }
    this.setState({
      row: tempRow,
    });
    console.log("rows: " + this.state.row);
    console.log("portfolio total: " + this.state.portfolioTotal);
  }

  render() {
    const screenHeight = Dimensions.get("window").height;
    return (
      <View style={[styles.container, { height: screenHeight * 0.65 }]}>
        <View style={styles.boardContainer}>
          <SafeAreaView style={[styles.board, { height: screenHeight * 0.6 }]}>
            <ScrollView style={styles.board}>
              <View style={styles.banner}>
                <Text style={styles.bannerText}>Stock Portfolio</Text>
              </View>
              {this.state.row.map((list) => {
                return (
                  <PortfolioStockRow
                    key={list[0]}
                    stock={list[0]}
                    percentChange={list[1]}
                    amount={list[2]}
                    total={list[3]}
                  />
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
        <View>
          <View style={styles.cashContainer}>
            <View>
              <Text style={styles.cashLabel}>Invested:</Text>
            </View>
            <View>
              <Text style={styles.cashValue}>
                {" "}
                $
                {Math.round(
                  (this.state.portfolioTotal + Number.EPSILON) * 100
                ) / 100}{" "}
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
    marginTop: 20,
    alignItems: "center",
  },
  board: {
    flex: 1,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    //alignItems: "center",
  },
  banner: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "grey",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#889b73",
  },
  bannerText: {
    fontSize: 48,
    textAlign: "center",
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
