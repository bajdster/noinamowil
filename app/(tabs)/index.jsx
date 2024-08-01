import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import DrinkSlider from '../components/drinkSlider'
import { useFonts, Bangers_400Regular } from '@expo-google-fonts/bangers';
import CustomButton from '../components/customButton';
import CategoriesSlider from '../components/categoriesSlider';
import EventsSlider from '../components/eventsSlider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//https://supabase.com/dashboard/project/mevyyzreknkmrisypxmd
//a jak w ogole skonfigurowac projekt w tym supabase aby dodac tam dane, zdjęcia, może autentykację itp?
const Home = () => {

  let [fontsLoaded] = useFonts({
    Bangers_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ScrollView style={styles.mainContainer} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>

    <View style={styles.coctailMenu}>
            <ImageBackground source={require("../../assets/images/watermelon.png")} style={styles.backgroundImage}>

            </ImageBackground>


        <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>
              Miksuj dowolnie swoje ulubione <Text style={styles.highlight}>koktaje</Text>
            </Text>
            {/* <Text style={styles.description}>Tysiące inspiracji na pyszne drinki</Text> */}
            <CustomButton title="Znajdź przepisy" />
        </View>

    </View>
        

      <DrinkSlider />
      <CategoriesSlider />
      <EventsSlider/>
  
    </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  coctailMenu: {
    width: '100%',
    height:250,
    alignItems:'center',
    justifyContent:'center',
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative',
    backgroundColor:'#cadefc',
  },
  welcomeTextContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    // overflow: 'hidden',
    backgroundColor:'white',
    borderRadius:10,
    position:'absolute',
    top:150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 22,
    fontFamily: 'Bangers_400Regular',
    color: '#8dc6ff',
    marginTop:20,
    width: '80%',
    textAlign:'center'
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 20
  },
  highlight:{
    color: '#e6a4b4',
    // textShadowRadius: 10
  },
  description:{
    fontSize:16,
    marginVertical:20,
    paddingHorizontal:20
  }
});
