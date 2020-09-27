import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.welcomeWords}>Welcome! Happy Trading Games, and may the odds be ever in your favor. </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerWords}>Username</Text>
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
  button: {
    alignItems: 'center',
    marginTop: 50
},
signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
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
  fontSize: 25
},
footer: {
  flex: 4,
  backgroundColor: '#889b73',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingHorizontal: 20,
  paddingVertical: 30
},
footerWords: {
  color: '#05375a',
  fontSize: 20,
  textAlign: 'left'
},

});
