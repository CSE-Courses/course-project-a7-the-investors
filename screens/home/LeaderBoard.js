import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import LeaderBoardRow from "./LeaderBoardRow.js";
import Parse from "parse/react-native.js";
import { AsyncStorage } from "react-native";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import * as SecureStore from "expo-secure-store";

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      //for use in LeaderBoardRow
      userRow: [],
      //needed for fetching users stocks
      stocks: [],
      amounts: [],
      //needed for displaying leaderboard content
      usernames: [],
      portfolioValues: [],
      usercash: [],
    };
  }

  async componentDidMount() {
    await this.loadLeaderBoard();
  }

  async loadLeaderBoard() {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.serverURL = "https://parseapi.back4app.com";
    Parse.initialize(
      "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz",
      "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4"
    );
    //need this key to fetch all users
    Parse.masterKey = "kZuJip8wEQ3vxC0OUMFCV0JTk52jZbihe17V2bH9";

    const idQuery = new Parse.Query("User");
    //returns unique user ids
    idQuery
      .distinct("objectId")
      .then((results) => {
        if (typeof document !== "undefined")
          document.write(`Unique ids: ${JSON.stringify(results)}`);
        //console.log(`Unique ids: ${JSON.stringify(results)}`);

        //populate id array with... users...
        this.setState({ ids: results });
        console.log("ids: " + this.state.ids);
        //run chain of methods to fetch stocks then calculate totals then load into leaderboard
        this.getStocks();
      })
      .catch((error) => {
        if (typeof document !== "undefined")
          document.write(`Error retrieving ids: ${JSON.stringify(error)}`);
        console.error("Error retrieving ids", error);
      });
  }

  async getStocks() {
    const tempStocks = [];
    const tempAmounts = [];
    const tempusrcash = [];
    //create array of usernames
    const tempUsers = [];
    var noinvestments = 0;
    for (var i = 0; i < this.state.ids.length; i++) {
      //use query to find respective IDs information
      const query = new Parse.Query("User");
      await query.get(this.state.ids[i]).then(
        (user) => {
          if (typeof document !== "undefined")
            document.write(
              `FOUND STOCK LIST: ${JSON.stringify(user.get("stocks"))}`
            );
          //need to check for undefined if user has no investments
          if (JSON.stringify(user.get("stocks")) !== undefined) {
            this.stockArray = JSON.parse(JSON.stringify(user.get("stocks")));
            //console.log("FOUND STOCK LIST: " + this.stockArray);
            //console.log("this.stockArray.length: " + this.stockArray.length);
          } else {
            //handle no investments
            noinvestments = 1;
          }

          const _tempStocks = [];
          const _tempAmounts = [];
          //go through array of stocks and amount of stock owned and seperate them into 2 different arrays
          for (var i = 0; i < this.stockArray.length; i++) {
            if (i % 2 === 0 && this.stockArray[i + 1] > 0) {
              _tempStocks.push(this.stockArray[i]);
            } else if (this.stockArray[i] > 0) {
              _tempAmounts.push(this.stockArray[i]);
            }
          }
          if (noinvestments == 0) {
            tempStocks.push(_tempStocks);
            tempAmounts.push(_tempAmounts);
            console.log("STOCKS: " + _tempStocks);
            console.log("AMOUNTS: " + _tempAmounts);
          } else {
            tempStocks.push(0);
            tempAmounts.push(0);
          }

          var t = user.get("cash");
          tempusrcash.push(t);
          //creat array of usernames
          tempUsers.push(user.get("username"));
          noinvestments = 0;
        },
        (error) => {
          if (typeof document !== "undefined")
            document.write(
              `Error while fetching user: ${JSON.stringify(error)}`
            );
          console.error("Error while fetching user", error);
        }
      );
    }
    this.setState({
      stocks: tempStocks,
      amounts: tempAmounts,
      usernames: tempUsers,
      usercash: tempusrcash,
    });

    //calculate monetary totals for every group of stocks
    await this.getPortfolioValue();
  }

  async getPortfolioValue() {
    const tempPortfolioValues = [];
    for (var i = 0; i < this.state.stocks.length; i++) {
      //console.log("stock list " + (i+1) + ": " + this.state.stocks[i]);
      //every individual stock
      const portfolioTotal = 0;
      for (var i1 = 0; i1 < this.state.stocks[i].length; i1++) {
        //console.log("stock " + (i1+1) + ": " + this.state.stocks[i][i1]);
        await fetch(
          "https://finnhub.io/api/v1/quote?symbol=" +
            this.state.stocks[i][i1] +
            "&token=bu317jf48v6pqlhnrjog"
        )
          .then((res) => res.json())
          .then(
            (result) => {
              portfolioTotal += result.c * this.state.amounts[i][i1];
            },
            (error) => {
              console.log(error);
            }
          );
      }
      tempPortfolioValues.push(
        portfolioTotal + parseInt(this.state.usercash[i])
      );
      console.log("TOTAL " + (i + 1) + " is " + portfolioTotal);
    }
    this.setState({
      portfolioValues: tempPortfolioValues,
    });
    //create leaderboard rows
    await this.createLeaderBoard();
  }

  async createLeaderBoard() {
    const tempRowArray = [];
    const tempPair = [];
    //go through all unique IDs
    for (var i = 0; i < this.state.ids.length; i++) {
      //use query to find respective IDs information
      tempPair.push([
        this.state.usernames[i],
        (Math.round(this.state.portfolioValues[i] + Number.EPSILON) * 100) /
          100,
      ]);
      //sort pairs in descending order of portfolio totals
      tempPair.sort(function (a, b) {
        return b[1] - a[1];
      });
    }
    //add place value for leaderboard row
    for (var i = 0; i < tempPair.length; i++) {
      tempRowArray.push([i + 1, tempPair[i][0], tempPair[i][1]]);
    }
    this.setState({
      userRow: tempRowArray,
    });
    console.log("userRow: " + this.state.userRow);
  }

  render() {
    return (
      <SafeAreaView style={styles.boardContainer}>
        <ScrollView style={styles.board}>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Leaderboard</Text>
            {/* <LeaderBoardRow key={'place'} place={'Place'} username={'Username'} cash={' NetWorth'} /> */}
          </View>
          {this.state.userRow.map((list) => {
            return (
              <LeaderBoardRow
                key={list[0]}
                place={list[0]}
                username={list[1]}
                cash={list[2]}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = {
  boardContainer: {
    alignItems: "center",
    marginTop: "5%",
    height: "65%",
    marginBottom: "5%",
  },
  board: {
    flex: 1,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  container: {
    marginTop: 10,
    alignItems: "center",
  },
  textStyling: {
    fontSize: 16,
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
