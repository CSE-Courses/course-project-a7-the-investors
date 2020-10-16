import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View, Button, Platform, PermissionsAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={profilePicPress}>
          <Image style={styles.image} source={require("./profile-icon.png")} />
        </TouchableOpacity>
        <Text style={styles.text}>{"\n"}Username: ExampleName</Text>
        <Text style={styles.text}>{"\n"}Email: user@example.com</Text>
        <Text style={styles.text}>{"\n"}Member since 9/28/2020</Text>
        <Text/>
        <Text/>
        <Text/>
        <Text/>
        <Text/>
        <Button
          title = "Delete Account"
          color = "ff00ff"
          onPress = {() => console.log("Pressed")}
        />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
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
});

const profilePicPress = async () => {
  let pic = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: false,
    aspect: [1,1],
    allowsEditing: false,
    exif: false,
  });
};




