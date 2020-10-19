
import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from "react-native";
import {AsyncStorage} from 'react-native';
import Parse, { User } from 'parse/react-native.js';
import { getID, getUserName } from './Info';


export default class ProfileScreen extends React.Component {

  delUser(){
   
      Parse.setAsyncStorage(AsyncStorage);
      Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
      Parse.initialize(
          'DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz', // This is your Application ID
          '97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4' // This is your Javascript key
      );
    const user = new Parse.User();
     user.logIn("anthony","test").then((user) => {
      // Do stuff after successful login
      if (typeof document !== 'undefined') document.write(`Logged in user: ${JSON.stringify(user)}`);
      console.log('Logged in user', user);
    }).catch(error => {
      if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);
      console.error('Error while logging in user', error);
    });
    
  const query = new Parse.Query(user);
  
  // Finds the user by its ID
  query.get('HJ1yxrATID').then((user) => {
    // Invokes the "destroy" method to delete the user
    user.destroy().then((response) => {
      if (typeof document !== 'undefined') document.write(`Deleted user: ${JSON.stringify(response)}`);
      console.log('Deleted user', response);
      this.props.rmLoginStatus();
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while deleting user: ${JSON.stringify(error)}`);
      console.error('Error while deleting user', error);
      this.props.rmLoginStatus();
    })
  });
  };

  


  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("./profile-icon.png")} />

        <Text style={styles.text}>{"\n"} UserName: {getUserName()}</Text>
        <Text style={styles.text}>{"\n"}Email: {getID()}</Text>
        <Text style={styles.text}>{"\n"}Member since 9/28/2020</Text>
       
        <TouchableOpacity onPress={() => this.delUser()}
                                      style={styles.buttonSign}>
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
    width: 150,
    height: 150,
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
  buttonWords:{
    fontSize: 18,
        color: "#000000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
  }
});
