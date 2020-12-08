import * as React from "react";
import {
  AsyncStorage,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import FollowBoard from "./FollowBoard";
import PortfolioStockRow from "../portfolio/PortfolioStockRow";
import * as SecureStore from "expo-secure-store";
import Parse from "parse/react-native";

export default class FollowingPortfolio extends React.Component {
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
      cash: 0,
    };
  }

  async _unsubscribe() {}

  async componentDidMount() {
    await this.getStocks();
    //Regather data when page is refreshed
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      console.log("REACHEDDDD");
      this.setState({
        portfolioTotal: 0,
      });
      this.getStocks();
    });
    // do something
  }

  async getStocks() {
    let userId;
    let stockArray;
    let tempCash;
    Parse.setAsyncStorage(AsyncStorage);
    Parse.serverURL = "https://parseapi.back4app.com";
    Parse.initialize(
      "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz",
      "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4"
    );
    //need this key to fetch all users
    Parse.masterKey = "kZuJip8wEQ3vxC0OUMFCV0JTk52jZbihe17V2bH9";
    const User = new Parse.User();
    const query = new Parse.Query(User);
    console.log("LOOKING FOR:::: " + this.props.route.params.id);
    await query.get(this.props.route.params.id).then(
      (user) => {
        if (typeof document !== "undefined")
          document.write(`User found: ${JSON.stringify(user)}`);
        console.log("User found", user);
        console.log("STOCKS:::" + user.get("stocks"));
        stockArray = user.get("stocks");
        tempCash = user.get("cash");
      },
      (error) => {
        if (typeof document !== "undefined")
          document.write(`Error while fetching user: ${JSON.stringify(error)}`);
        console.error("Error while fetching user", error);
      }
    );

    //stockArray = JSON.parse(stockArray);
    console.log("TOCKARRAY: " + stockArray);
    const tempStocks = [];
    const tempAmounts = [];
    //go through array of stocks and amount of stock owned and seperate them into 2 different arrays
    for (var i = 0; i < stockArray.length; i++) {
      if (i % 2 === 0 && stockArray[i + 1] > 0) {
        tempStocks.push(stockArray[i]);
      } else if (stockArray[i] > 0) {
        tempAmounts.push(stockArray[i]);
      }
    }

    this.setState({
      stocks: tempStocks,
      amounts: tempAmounts,
      cash: tempCash,
    });

    console.log("STOCKS: " + this.state.stocks);
    console.log("AMOUNTS: " + this.state.amounts);
    await this.getStockPrice();
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
      <ScrollView>
        <View style={styles.container}>
          <SafeAreaView style={styles.boardContainer}>
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

              <View>
                <Text style={styles.cashLabel}>Cash:</Text>
              </View>
              <View>
                <Text style={styles.cashValue}>{this.state.cash}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
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
