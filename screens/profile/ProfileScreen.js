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
      imageUrl: "https://image.flaticon.com/icons/png/512/64/64495.png",
      submitUrl: "",
      date: "",
      user: "",
      email: ""
    };
  }

  async componentDidMount() {
    await this.getProfilePicture();
    await this.getDate();
  }

  async getDate(){
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

    let creationDate;
    let username;
    let userEmail;
    await Parse.User.me(sessionToken)
        .then((user) => {
          const currentUser = Parse.User.current();

          creationDate = JSON.stringify(currentUser.get('createdAt'));
          username = currentUser.get('username');
          userEmail = currentUser.get('email')
        })
        .catch((error) => {
          if (typeof document !== "undefined")
            document.write(
                `Error while logging in user: ${JSON.stringify(error)}`
            );
          console.error("Error while logging in user", error);
        });

    if (creationDate !== undefined) {
      let strArray = creationDate.split("T");
      let choppedDate = strArray[0];
      choppedDate = choppedDate.slice(1,choppedDate.length);
      this.setState({date: choppedDate});
    }
    if(username !== undefined){
      this.setState({user: username});
    }
    if(userEmail !== undefined){
      this.setState({email: userEmail});
    }



  }

  async getProfilePicture(){
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

    let URL = '';
    await Parse.User.me(sessionToken)
        .then((user) => {
          const currentUser = Parse.User.current();

          console.log("LOOOGGGED" + currentUser.get('profilePictureUrl'));

          URL = currentUser.get('profilePictureUrl');

        })
        .catch((error) => {
          if (typeof document !== "undefined")
            document.write(
                `Error while logging in user: ${JSON.stringify(error)}`
            );
          console.error("Error while logging in user", error);
        });

    if (URL !== undefined || !URL.isEmpty) {
      console.log("REACHED::: " + URL);
      console.log("REACHED")


      this.setState({imageUrl: URL})
    }




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
        let URL = this.state.submitUrl;
        currentUser.set("profilePictureUrl", URL);
        user
          .save()
          .then((response) => {
            if (typeof document !== "undefined")
              document.write(`Updated user: ${JSON.stringify(response)}`);
            console.log("Updated user", response);
            this.setState({imageUrl: URL})
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
          //avo();
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

  resetAlert(){

    Alert.alert(
        "Reseting game",
        "By clicking reset all investments will be deleted and balance will be set back to $100,000. \n" +
        "Are you sure?",

        [
          {
            text: "Reset",
            onPress: () => console.log("Reset Game")
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
          ],
        { cancelable: false }
    );

  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.imageUrl }} />
        <TextInput

          autoCapitalize="none"
          style={{ height: 40, borderColor: "gray", borderWidth: 0 }}
          onChangeText={(text) => this.setState({ submitUrl: text })}
          // blurOnSubmit = {true}
          // clearTextOnFocus = {true}
          placeholder={"Input image url"}
        />
        <TouchableOpacity
            onPress={() => this.updateProfilePicture()}
            style={styles.buttonSign}
        >
          <Text style={styles.buttonWords}>Update Profile picture</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          {"\n"} UserName: {this.state.user}
        </Text>
        <Text style={styles.text}>
          {"\n"}Email: {this.state.email}
        </Text>
        <Text style={styles.text}>{"\n"}Member since {this.state.date}</Text>


          <TouchableOpacity
              onPress={() => this.resetAlert()}
              style={styles.buttonDelete}
          >
              <Text style={styles.buttonWords}>Reset Account</Text>
          </TouchableOpacity>


        <TouchableOpacity
          onPress={() => this.delUser()}
          style={styles.buttonDelete}
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
    //backgroundColor: "#889b73",
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
    backgroundColor: "#889b73",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    // marginLeft: widthfoot / 2,
    // marginTop: 20,
  },
  buttonDelete: {
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
