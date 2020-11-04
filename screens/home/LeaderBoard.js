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

    // Returns unique emails
    query
      .distinct("username")
      .then((results) => {
        if (typeof document !== "undefined")
          document.write(`Unique usernames: ${JSON.stringify(results)}`);
        console.log(`Unique usernames: ${JSON.stringify(results)}`);

        //push all users to temporary array
        for (var i = 0; i < results.length; i++) {
          tempArray.push([(i+1), results[i], "10000"]);
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
    console.log("here are the users: " + this.state.users);
    return (
      <View style={[styles.container]}>
        <View style={{ backgroundColor: "grey" }}>
            <Text style={{ fontSize: 48, textAlign: "center" }}>
              Leaderboard
            </Text>
          </View>          
          <View style={styles.boardContainer}>
          <View style={styles.board}>
          <ScrollView style={{ backgroundColor: "white" }}>
            {this.state.users.map((list) => {
              return (
                <LeaderBoardRow
                  //key={list[0]}
                  place={list[0]}
                  username={list[1]}
                  cash={list[2]}
                />
              );
            })}
          </ScrollView>
          </View>
          </View>
      </View>
    );
  }
}

const styles = {
  boardContainer: {
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
  container: {
    marginTop: 10,
    alignItems: "center",
  },
  textStyling: {
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
  },
};
