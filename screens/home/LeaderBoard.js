import * as React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import LeaderBoardRow from "./LeaderBoardRow.js";
import Parse from "parse/react-native.js";
import { AsyncStorage } from "react-native";

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: "",
      username: "",
      cash: "",
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
    Parse.masterKey = 'kZuJip8wEQ3vxC0OUMFCV0JTk52jZbihe17V2bH9';
    const query = new Parse.Query("User");

    //temporary array
    const tempArray = [];

    // Returns unique emails
    query.distinct("username").then((results) => {
      if (typeof document !== "undefined")
        document.write(`Unique usernames: ${JSON.stringify(results)}`);
      console.log(`Unique usernames: ${JSON.stringify(results)}`);
      
      //push all users to temporary array
      for(var i = 0; i < results.length ; i++){
        tempArray.push(results[i]);
      }

      //populate users with... users...
      this.setState({users: tempArray});

    })
    .catch((error) => {
      if (typeof document !== "undefined")
        document.write(
          `Error retrieving users: ${JSON.stringify(error)}`
        );
      console.error("Error retrieving users", error);
    });
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <View>
          <View style={{ backgroundColor: "grey" }}>
            <Text style={{ fontSize: 48, textAlign: "center" }}>
              Leaderboard
            </Text>
          </View>
          <ScrollView style={{ backgroundColor: "white" }}>
            <LeaderBoardRow />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "5%",
    marginRight: "5%",
    justifyContent: "center",
    marginVertical: "10%",
    // marginBottom: "10%",
    alignContent: "center",
    backgroundColor: '#889b73'
  },
  textStyling: {
    fontSize: 16,
  },
});
