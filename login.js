import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, Dimensions, TextInput, Alert} from 'react-native';
const height = Dimensions.get('window').height*0.75;
const widthfoot = Dimensions.get('window').width;

export default function App() {
  return (
    
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.welcomeWords}>Welcome! Happy Trading Games, and may the odds be ever in your favor. </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerWords}>Username</Text>
        <TextInput 
                    placeholder="Your Username/Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                />
        <Text style={styles.footerWords}>Password</Text>
        <TextInput 
                    placeholder="Your top secret Password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    
                /><TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}
                style={styles.buttonForgot}>
                  <Text style={styles.forgotPass}>Forgot Password?</Text>
       </TouchableOpacity>
        
        <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}
           style={styles.buttonSign}>
          <Text style={styles.buttonWords}>Sign In</Text>
  </TouchableOpacity>

  <Text style={{color: '#403f42', fontWeight: 'bold', fontSize: 25,alignItems: 'center', paddingLeft:widthfoot-(widthfoot/3), paddingTop:10}}>Or</Text>

  <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}
           style={styles.buttonSign}>
          <Text style={styles.buttonWords}>Register</Text>
  </TouchableOpacity>
      </View>
    </View>
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

header: {
  flex: 1,
  justifyContent: 'flex-end',
  paddingHorizontal: 20,
  paddingBottom: 50
},

welcomeWords: {
  color: '#403f42',
  fontWeight: 'bold',
  fontSize: 25,
  alignSelf: "center",
},
footer: {
  flex: 4,
  backgroundColor: '#889b73',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingHorizontal: 20,
  width:widthfoot,
  paddingVertical: 30
  
},
footerWords: {
  paddingTop: 20,
  paddingBottom: 10,
  color: '#05375a',
  fontSize: 20,
  textAlign: 'left'
},
textInput: {
  height: 40,
  borderColor: '#EAFAF1',
  borderWidth: 3,
  marginBottom: 0,
  color: '#05375a',
  
},
forgotPass:{
  color: '#05375a',
  fontSize: 10,
  textAlign: 'left',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:6
},

buttonSign: {
  elevation: 8,
  backgroundColor: "#fff",
  borderRadius: 10,
  paddingVertical: 12,
  paddingHorizontal: 12,
  marginLeft: widthfoot/2,
  marginTop: 20,
  


},
buttonForgot:{
  backgroundColor: "#889b73",
  borderRadius: 3,
  marginRight: widthfoot/2,
  

},
buttonWords: {
  fontSize: 18,
  color: "#008000",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
}

});
