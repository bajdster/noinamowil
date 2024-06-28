import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import DrinkSlider from '../components/drinkSlider'
// import {Carousel} from "react-native-snap-carousel"
import { useFonts, Bangers_400Regular } from '@expo-google-fonts/bangers';

const Home = () => {

  let [fontsLoaded] = useFonts({
    Bangers_400Regular,
  });
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>Dowiedź się jak w prosty sposób przygotowywać drinki jak prawdziwy barman</Text>
      </View>
      <View style={styles.lineText}>
        {/* <Text style={styles.callToAction}>Wybierz drink dla siebie</Text> */}
        {/* <Text style={styles.callToActionSmall}>Dowiedz się więcej</Text> */}
      </View>
      
      <DrinkSlider/>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer:
  {
    flex: 1,
    paddingHorizontal: 36
  },
  welcomeTextContainer:
  { 
    height:150,
    alignItems:'center',
    justifyContent:'center',
  },
  welcomeText:{
    fontSize:26,
    textAlign:'center',
    fontFamily: 'Bangers_400Regular',
    color:'#00a6f9'
  },
  callToAction:{
    fontWeight:'bold',
    fontSize:16
  },
  lineText:{
    flexDirection:'row',
    // justifyContent:'space-around',
    // alignItems:'center'
  },
  callToActionSmall:{
    fontSize:12
  }
})