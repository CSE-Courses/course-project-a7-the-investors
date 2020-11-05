import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import LeaderBoardRow from "./LeaderBoardRow.js";
import Parse from "parse/react-native.js";
import { AsyncStorage } from "react-native";

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
    const query = new Parse.Query("User");

    //temporary array
    const tempArray = [];

    // Returns unique (distinct) usernames
    query
      .distinct("username")
      .then((results) => {
        if (typeof document !== "undefined")
          document.write(`Unique usernames: ${JSON.stringify(results)}`);
        console.log(`Unique usernames: ${JSON.stringify(results)}`);

        //push all users to temporary array
        for (var i = 0; i < results.length; i++) {
          tempArray.push([i + 1, results[i], "10000"]);
        }
        //populate users with... users...
        this.setState({ users: tempArray });
        //console.log("users: " + this.state.users);
      })
      .catch((error) => {
        if (typeof document !== "undefined")
          document.write(`Error retrieving users: ${JSON.stringify(error)}`);
        console.error("Error retrieving users", error);
      });
  }

  render() {
    console.log("users and their data: " + this.state.users);
    return (
        <SafeAreaView style={styles.boardContainer}>
          <ScrollView style={styles.board}>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Leaderboard</Text>
            </View>
            {this.state.users.map((list) => {
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
    //flex: 1,
    alignItems: "center",
    marginTop: "3%",
    height: "42%",
    marginBottom: "10%",
  },
  board: {
    flex: 1,
    width: "95%",
    shadowOpacity: 0.2,
    shadowRadius: 1.3,
    //elevation: 2,
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
    width: "95%",
    alignSelf: "center",
  },
  bannerText: {
    //backgroundColor: "grey",
    fontSize: 48,
    textAlign: "center",
  },
};
