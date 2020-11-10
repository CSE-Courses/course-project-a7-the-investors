import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import LeaderBoardRow from "./LeaderBoardRow.js";
import Parse from "parse/react-native.js";
import { AsyncStorage } from "react-native";

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      //for use in LeaderBoardRow
      userRow: [],
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
        //run method to fetch users corresponding cash amount
        this.getUsernameAndCash();
      })
      .catch((error) => {
        if (typeof document !== "undefined")
          document.write(`Error retrieving ids: ${JSON.stringify(error)}`);
        console.error("Error retrieving ids", error);
      });
  }

  async getUsernameAndCash() {
    const tempRowArray = [];
    const tempPair = [];
    //go through all unique IDs
    for (var i = 0; i < this.state.ids.length; i++) {
      //use query to find respective IDs information
      const query = new Parse.Query("User");
      await query.get(this.state.ids[i]).then(
        (user) => {
          if (typeof document !== "undefined")
            document.write(`User found: ${JSON.stringify(user.get("cash"))}`);
          //console.log("User found", user.get("username"), user.get("cash"));

          //create a pair of a username and its corresponding cash amount
          if (user.get("cash") == undefined) {
            tempPair.push([user.get("username"), 0]);
          } else {
            //round cash amount to 2 decimals
            var round =
              Math.round((user.get("cash") + Number.EPSILON) * 100) / 100;
            tempPair.push([user.get("username"), round]);
          }
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
    //sort pairs in descending order for cash amounts
    tempPair.sort(function (a, b) {
      return b[1] - a[1];
    });
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
    height: "70%",
    marginBottom: "10%",
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
  },
  bannerText: {
    fontSize: 48,
    textAlign: "center",
  },
};
