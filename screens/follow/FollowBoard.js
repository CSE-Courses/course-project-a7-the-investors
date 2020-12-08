import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Parse from "parse/react-native";
import FollowBoardRow from "./FollowBoardRow.js";

export default class FollowBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      following: [], 
      followRow: [],
      userToAdd: "",
      ids: [],
      usernames: [],
      selfUsername: "",
      followingIds: '',
      updated: false
     };
    this.updateParent = this.updateParent.bind(this);
  }
  async componentDidMount() {
    await this.getFollowing();
  }

  async updateParent(){
    this.setState({updated: !this.state.updated})
    console.log("UPDATED")
    await this.getFollowing()
  }

  async getFollowing() {
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
        this.usernameArray();
        this.getMyUsername();
      })
      .catch((error) => {
        if (typeof document !== "undefined")
          document.write(`Error retrieving ids: ${JSON.stringify(error)}`);
        console.error("Error retrieving ids", error);
      });

    let tempFollowing = [];
    const tempFollowRow = [];
    await SecureStore.getItemAsync("followingList")
      .then((following) => {
        tempFollowing = JSON.parse(following);
        //tempFollowing.push(following);
        this.setState ({following: tempFollowing});
      })
      .catch((error) => {
        console.error("Error retrieving followers", error);
      });
    let tempIds =[];
    await SecureStore.getItemAsync("followingIds").then((tfollowingIds) => {
      tempIds = JSON.parse(tfollowingIds);
      this.setState({
        followingIds: tempIds,
      });
    });

    // this.setState ({following: tempFollowing});
    // console.log("List of following" + this.state.following);
    //for rows
    for (var i = 0; i < tempFollowing.length; i++) {
      tempFollowRow.push([tempFollowing[i], this.state.followingIds[i]]);
    }
    this.setState({ followRow: tempFollowRow });
  }

  async getMyUsername(){
    let tempUsername = "";
    await SecureStore.getItemAsync("username").then((username) => {
      tempUsername = JSON.parse(username);
      this.setState({
        selfUsername: tempUsername,
      });
    });
    console.log("my username is " + this.state.selfUsername);
  }


  async usernameArray(){
    //get list of usernames
    const tempUsers = [];
    for (var i = 0; i < this.state.ids.length; i++) {
      const query = new Parse.Query("User");
      await query.get(this.state.ids[i]).then(
        (user) => {
          //create array of usernames
          tempUsers.push(user.get("username"));
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
    this.setState({usernames: tempUsers});
    //console.log("usernames: " + this.state.usernames);
  }

  async addFollower(){
    Parse.setAsyncStorage(AsyncStorage);
    Parse.serverURL = "https://parseapi.back4app.com";
    Parse.initialize(
      "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz",
      "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4"
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
        let followingList = this.state.following;
        console.log("FOLLWING IDS: " + this.state.followingIds);
        currentUser.set("following", followingList);
        currentUser.set('followingIds', this.state.followingIds)
        user
          .save()
          .then((response) => {
            if (typeof document !== "undefined")
              document.write(`Updated user: ${JSON.stringify(response)}`);
              //console.log("Updated user", response);
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
        //console.log("Current logged in user", currentUser);
      })
      .catch((error) => {
        if (typeof document !== "undefined")
          document.write(
            `Error while logging in user: ${JSON.stringify(error)}`
          );
        console.error("Error while logging in user", error);
      });
      
      await SecureStore.setItemAsync(
        "followingList",
        JSON.stringify(this.state.following)
      );

    await SecureStore.setItemAsync(
        "followingIds",
        JSON.stringify(this.state.followingIds)
    );
  }

  showListRender() {
    console.log("User to add is " + this.state.userToAdd);
    var listOfUsers = this.state.usernames.filter(s => s.includes(this.state.userToAdd));
    console.log("ListOfUsers " + listOfUsers);
    if (this.state.userToAdd){
      if (listOfUsers){
        //put exact match at the front of list
        if (listOfUsers.includes(this.state.userToAdd)){
          listOfUsers = listOfUsers.filter(item => item !== this.state.userToAdd);
          listOfUsers.unshift(this.state.userToAdd);
        }
        //list first 5 users with first user being exact match
        var limit = 5;
        if (listOfUsers.length < 5){
          limit = listOfUsers.length;
        }
        //console.log(limit + " users");
        return (
          <View style={styles.listofUsers}>
            <Text> {listOfUsers[0]} </Text>
            {limit>1 ?(
              <Text> {listOfUsers[1]} </Text>
            ):null}
            {limit>2 ?(
              <Text> {listOfUsers[2]} </Text>
            ):null}
            {limit>3 ?(
              <Text> {listOfUsers[3]} </Text>
            ):null}
            {limit>4 ?(
              <Text> {listOfUsers[4]} </Text>
            ):null}
          </View>
        );
      }
    }
  }

  async addButton(){
    var validId = this.state.usernames.includes(this.state.userToAdd);
    var notAlreadyFollowing = !this.state.following.includes(this.state.userToAdd);
    var notSelf = (this.state.userToAdd != this.state.selfUsername)
    if (validId && notAlreadyFollowing && notSelf){  
      console.log("List of following is " + this.state.following);
      this.state.followingIds.push(this.state.ids[this.state.usernames.indexOf(this.state.userToAdd)]);

      this.state.following.push(this.state.userToAdd);
      console.log("List of following after push is " + this.state.following);
      this.addFollower();
      this.getFollowing();
    }else if(!notAlreadyFollowing){
      Alert.alert("You already follow this user","  ",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false });
      return;
    }else if(!notSelf){
      Alert.alert("You cannot follow yourself","  ",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false });
      return;
    }else{
      Alert.alert("Not a valid user","  ",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false });
      return;
    }
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
                      id={list[1]}
                      navigation={this.props.navigation}
                      updateParent={this.updateParent}
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
            autoCapitalize="none"
            onChangeText={(text) => {
              this.setState({ userToAdd: text});
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.buttonSign}
            onPress={() => this.addButton()}
          >
            <Text style={styles.buttonWords}>ADD</Text>
          </TouchableOpacity>
        </View>
        {this.showListRender()}
      </SafeAreaView>
    );
  }
}

const styles = {
  boardContainer: {
    alignItems: "center",
    marginTop: "5%",
    height: 350,
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
    paddingTop: 70,
    paddingBottom: 10,
    fontSize: 14,
  }
};
