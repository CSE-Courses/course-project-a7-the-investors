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
    this.state = { following: [], followRow: [] };
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
              }}
            ></TextInput>
            <TouchableOpacity
              //function need
              //onPress={() => this.getFollowing()}
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
};
