import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
} from "react-native";
import { Component } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default class SearchScreen extends Component {
  /*const [data, setData] = React.useState({
        username: '',
        email: '',
        password: '',
    });*/

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/stockPhoto.jpg")}
          ></Image>
        </View>
        <TouchableOpacity style={styles.touchableButton}>
          <Text style={styles.touchableText}> Sign up with Google </Text>
          {/*onPress={()=> go to google and get info*/}
        </TouchableOpacity>

        <Text style={styles.setInfo}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Your username"
          autoCapitalize="none"
          //onChangeText={(val) => setUsername(val)}
        />

        <Text style={styles.setInfo}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email"
          autoCapitalize="none"
          //onChangeText={(val) => setEmail(val)}
        />

        <Text style={styles.setInfo}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Your password"
          autoCapitalize="none"
          //onChangeText={(val) => setPasswordAttempt1(val)}
        />

        <Text style={styles.setInfo}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Your password"
          autoCapitalize="none"
          //onChangeText={(val) => setPasswordAttempt2(val)}
        />

        <TouchableOpacity style={styles.touchableButton}>
          <Text style={styles.touchableText}> Sign Up </Text>
          {/*onPress={()=> add to database and go to home?*/}
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.loginText}> Already signed up? Login </Text>
          {/*onPress={()=> navigation.navigate('Login')}*/}
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: 30,
    margin: 10,
  },
  image: {
    width: 123,
    height: 81,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  login: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
  },
  setInfo: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    color: "#B95C24",
    padding: 10,
  },
  touchableButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B95C24",
    padding: 10,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 15,
  },
  touchableText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
