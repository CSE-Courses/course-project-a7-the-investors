
import * as React from "react";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import {Component} from "react";


export default class Edu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
       
       
    <TouchableOpacity
          onPress={() => this.delUser()}
          style={styles.buttonDelete}
        >
          <Text style={styles.buttonWords}>Delete Account</Text>
        </TouchableOpacity>



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