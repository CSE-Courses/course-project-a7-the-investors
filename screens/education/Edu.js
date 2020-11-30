
import * as React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Linking, Dimensions } from "react-native";
import { Component } from "react";


export default class Edu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <View style={styles.container}>


        <View style={styles.headr}>
          <Text style={styles.text}
            onPress={() => Linking.openURL('https://www.reddit.com/r/wallstreetbets/')}>
            WallStreetBets
         </Text>

          <Text style={styles.description}>
           
 Participants discuss stock and option trading.It is known for its aggressive 
  trading strategies, which primarily revolve around highly speculative, leveraged options trading, an activity often considered gambling.
  
          </Text>
        </View>


        <View style={styles.headr}>
          <Text style={styles.text}
            onPress={() => Linking.openURL('https://www.youtube.com/watch?v=YcIBa_XQapo&list=PLWCHyH3RlwTH1J1hn4OH5npnBV3icKPv-&ab_channel=ZipTrader')}>
            ZipTrader
       </Text>

          <Text style={styles.description}>
            Good Introduction on how to become a day trader. Explains high level concepts and educates about doing proper research on stock.
          </Text>
        </View>


        <View style={styles.headr}>
          <Text style={styles.text}
            onPress={() => Linking.openURL('https://www.zacks.com/')}>
            Zacks
       </Text>

          <Text style={styles.description}>
            Provides a ranking system based on earning to help you decided if a stock is worth buying currently.
        </Text>
        </View>


        <View style={styles.headr}>
          <Text style={styles.text}
            onPress={() => Linking.openURL('https://www.investopedia.com/ask/answers/081114/how-does-warren-buffett-choose-what-companies-buy.asp')}>
            Investopedia
       </Text>
          <Text style={styles.description}>
            Provides a wide range of strategies and tactics on how to pick stocks. Can be used as a resource to gain a better understanding of how the stock 
            market works in general and news about certain stocks. 
        </Text>
        </View>

        
      </View>



    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#889b73",
    alignItems: "center",
    justifyContent: "center",
  },
  headr: {
    flex: 1,
    width:  (Dimensions.get('window').width/4)*3,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",

  },
  text: {
    
    alignSelf: "center",
    justifyContent: "center",
    
    fontSize: 30,
    color: "blue",
    fontWeight: "bold"
  },
  description: {
    flex: 1/2,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 10,
    margin: 24,
    color: "green",
  },

});