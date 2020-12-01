import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import FollowBoardRow from "./FollowBoardRow.js";

export default class FollowBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      following: [], 
      followRow: [],
      userToAdd: "",
      listOfUsers: [],
     };
  }
  async componentDidMount() {
    await this.getFollowing();
  }

  async getFollowing() {
    const tempFollowing = [];
    const tempFollowRow = [];
    await SecureStore.getItemAsync("followingList")
      .then((following) => {
        tempFollowing.push(following);
        console.log("following: " + following);
      })
      .catch((error) => {
        console.error("Error retrieving followers", error);
      });
    //for rows
    let followAraray = JSON.parse(tempFollowing);
    for (var i = 0; i < followAraray.length; i++) {
      tempFollowRow.push([followAraray[i], 1]);
    }
    this.setState({ followRow: tempFollowRow });
  }

  async addFollower(){
    if (this.state.listOfUsers){
      //add this.state.userToAdd to following list in database
      Parse.setAsyncStorage(AsyncStorage);
      Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
      Parse.initialize(
        "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz", // This is your Application ID
        "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4" // This is your Javascript key
      );

      let sessionToken;

      SecureStore.getItemAsync("sessionToken").then((token) => {
        sessionToken = token;
      });

      const User = new Parse.User();
      const query = new Parse.Query(User);

      Parse.User.me(sessionToken)
        .then((user) => {
          const currentUser = Parse.User.current();
          let addFollow = this.state.userToAdd;
          let getFollows = currentUser.get("following");
          currentUser.set("following", getFollows.concat([addFollow]));
          user
            .save()
            .then((response) => {
              if (typeof document !== "undefined")
                document.write(`Updated user: ${JSON.stringify(response)}`);
              console.log("Updated user", response);
              //this.setState({userToAdd: URL})
            })
            .catch((error) => {
              if (typeof document !== "undefined")
                document.write(
                  `Error while updating user: ${JSON.stringify(error)}`
                );
              console.error("Error while updating user", error);
            });

          if (typeof document !== "undefined")
            document.write(
              `Current logged in user: ${JSON.stringify(currentUser)}`
            );
          console.log("Current logged in user", currentUser);
        })
        .catch((error) => {
          if (typeof document !== "undefined")
            document.write(
              `Error while logging in user: ${JSON.stringify(error)}`
            );
          console.error("Error while logging in user", error);
        });
      }
  }

  async showList() {
    if (!this.state.listOfUsers){
      return (
        <View style={styles.listOfUsers}>
          <Text> No users </Text>
        </View>
      );
    }else{
      //list first 5 users with first user being exact match
      const limit = 5;
      if (listOfUsers.length < 5){
        limit = this.state.listOfUsers.length;
      }
      return (
        <View style={styles.listofUsers}>
          <Text> $this.state.userToAdd </Text>
          {limit>2 ?(
            <Text> $this.state.listOfUsers[1] </Text>
          ):null}
          {limit>3 ?(
            <Text> $this.state.listOfUsers[2] </Text>
          ):null}
          {limit>4 ?(
            <Text> $this.state.listOfUsers[3] </Text>
          ):null}
          {limit>5 ?(
            <Text> $this.state.listOfUsers[4] </Text>
          ):null}
        </View>
      );
    }
  }

  async userList(){
    /*
    if (userToAdd.length == 1)
      for (go through database){
        if (userOfData.startsWith(this.state.userToAdd)){
          if (exactMatch){
            listofUsers.unshift(this.state.userToAdd)
          }
          else{
            listOfUsers.push(userOfData);
          }
        }
    }else{    //search through existing listOfUsers to narrow down instead of database
      for (const u of this.state.listOfUsers)
        if (u.startsWith(this.state.userToAdd)){
          if (exactMatch){
            listofUsers.unshift(this.state.userToAdd)
          }
          else{
            listOfUsers.push(userOfData);
          }
        }
    }
    */
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.boardContainer}>
          <ScrollView style={styles.board}>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>Following</Text>
            </View>
            {this.state.followRow.map((list) => {
              return (
                <FollowBoardRow
                  key={list[0]}
                  username={list[0]}
                  money={list[1]}
                />
              );
            })}
          </ScrollView>
        </View>
          <View style={styles.row}>
            {/* render new input as stock search */}
            <TextInput
              style={styles.searchInput}
              placeholder={"follow..."}
              onChangeText={(text) => {
                //funciton needed for follow
                //this.setState({ following: [text] });
                //this.setState({ userToAdd: text})
              }}
            ></TextInput>
            <TouchableOpacity
              //function need
              onPress={() => this.getFollowing()}
              style={styles.buttonSign}
            >
              <Text style={styles.buttonWords}>ADD</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  boardContainer: {
    alignItems: "center",
    marginTop: "5%",
    height: "70%",
    marginBottom: "5%",
    width: "95%",
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
  listOfUsers: {
    flex: 1 / 2,
    paddingTop: 50,
    paddingBottom: 10,

    alignItems: "center",
  },
};
