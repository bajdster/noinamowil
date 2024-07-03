import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import DrinkSlider from '../components/drinkSlider'
// import {Carousel} from "react-native-snap-carousel"
import { useFonts, Bangers_400Regular } from '@expo-google-fonts/bangers';
import { Link } from 'expo-router';
import CustomButton from '../components/customButton';

const Home = () => {

  let [fontsLoaded] = useFonts({
    Bangers_400Regular,
  });
  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={{justifyContent:"center", alignItems:"center"}}>
    <Image source={require("../../assets/images/maintheme3.png")} style={styles.mainBanner}/>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>Dowiedź się jak w prosty sposób przygotowywać drinki jak <Text style={styles.highlight}>prawdziwy barman</Text></Text>
        <Image source={require("../../assets/images/drink.png")} style={styles.drinkImage}/>
        <CustomButton title="Znajdź przepisy"/>
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
    // paddingHorizontal: 36,
  },
  welcomeTextContainer:
  { 
    height:200,
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#cbbcf6',
    marginTop:24,
    marginBottom:24,
    borderRadius:12,
    paddingHorizontal:6
  },
  welcomeText:{
    fontSize:22,
    textAlign:'center',
    fontFamily: 'Bangers_400Regular',
    color:'#00a6f9'
  },
  highlight:{
    color: 'white'
  },
  mainBanner:{
    width:'100%',
    height:300,
    marginTop:20,
  },
  drinkImage:{
    width:100,
    height:100,
    right:8,
    bottom:40,
    zIndex:-10,
    position:'absolute',
    resizeMode:'contain'
  }
})