import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { AsyncStorage } from "react-native";
import Parse, { User } from "parse/react-native.js";
import { getEmail, getID, getpasswd, getUserName } from "./Info";
import * as SecureStore from "expo-secure-store";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "https://image.flaticon.com/icons/png/512/64/64495.png",
    };
  }

  async updateProfilePicture() {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
    Parse.initialize(
      "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz", // This is your Application ID
      "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4" // This is your Javascript key
    );

    let sessionToken;

    SecureStore.getItemAsync("sessionToken").then((token) => {
      sessionToken = token;
      console.log("THIS IS THE TOKEN" + token);
    });

    const User = new Parse.User();
    const query = new Parse.Query(User);

    Parse.User.me(sessionToken)
      .then((user) => {
        const currentUser = Parse.User.current();
        let URL = this.state.imageURL;
        currentUser.set("profilePictureUrl", URL);
        user
          .save()
          .then((response) => {
            if (typeof document !== "undefined")
              document.write(`Updated user: ${JSON.stringify(response)}`);
            console.log("Updated user", response);
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

  delUser() {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
    Parse.initialize(
      "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz", // This is your Application ID
      "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4" // This is your Javascript key
    );
    const user = new Parse.User();

    user
      .logIn(getUserName(), getpasswd())
      .then((user) => {
        // Do stuff after successful login
        if (typeof document !== "undefined")
          document.write(`Logged in user: ${JSON.stringify(user)}`);
        console.log("Logged in user", user);
      })
      .catch((error) => {
        if (typeof document !== "undefined")
          document.write(
            `Error while logging in user: ${JSON.stringify(error)}`
          );
        console.error("Error while logging in user", error);
      });

    const query = new Parse.Query(user);

    // Finds the user by its ID
    query.get(getEmail()).then((user) => {
      // Invokes the "destroy" method to delete the user
      user.destroy().then(
        (response) => {
          if (typeof document !== "undefined")
            document.write(`Deleted user: ${JSON.stringify(response)}`);
          console.log("Deleted user", response);
          avo();
        },
        (error) => {
          if (typeof document !== "undefined")
            document.write(
              `Error while deleting user: ${JSON.stringify(error)}`
            );
          console.error("Error while deleting user", error);
        }
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.imageURL }} />
        <TextInput
          placeholder="Insert URL to change profile"
          autoCapitalize="none"
          style={{ height: 40, borderColor: "gray", borderWidth: 0 }}
          onChangeText={(text) => this.setState({ imageURL: text })}
          // blurOnSubmit = {true}
          // clearTextOnFocus = {true}
          onSubmitEditing={() => this.updateProfilePicture()}
          value={""}
        />
        <Text style={styles.text}>
          {"\n"} UserName: {getUserName()}
        </Text>
        <Text style={styles.text}>
          {"\n"}Email: {getID()}
        </Text>
        <Text style={styles.text}>{"\n"}Member since 9/28/2020</Text>

        <TouchableOpacity
          onPress={() => this.delUser()}
          style={styles.buttonSign}
        >
          <Text style={styles.buttonWords}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00bbee",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    color: "#000",
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonSign: {
    elevation: 8,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    // marginLeft: widthfoot / 2,
    // marginTop: 20,
  },
  buttonWords: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
