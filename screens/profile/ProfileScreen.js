import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View, Button, TextInput } from "react-native";
//import * as ImagePicker from 'expo-image-picker';
//import * as Prompt from "react-native-input-prompt"

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: 'https://image.flaticon.com/icons/png/512/64/64495.png'
    
    }
  }
  render() {
    return (
      <View style={styles.container}>
        
        <Image style={styles.image} source={{uri: this.state.imageURL}} />
        <TextInput
          placeholder = "Insert URL to change profile"
          autoCapitalize="none"
          style = {{ height: 40, borderColor: 'gray', borderWidth: 0 }}
          onChangeText = {(text) => this.setState({imageURL: text}) }
          blurOnSubmit = {true}
          clearTextOnFocus = {true}
          value = {""}
          
        />
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

// const profilePicPress = async () => {
//   let pic = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsMultipleSelection: false,
//     aspect: [1,1],
//     allowsEditing: false,
//     exif: false,
//   });
// };




