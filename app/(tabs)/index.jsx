import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import DrinkSlider from '../components/drinkSlider'
import { useFonts, Bangers_400Regular } from '@expo-google-fonts/bangers';
import CustomButton from '../components/customButton';
import CategoriesSlider from '../components/categoriesSlider';
import EventsSlider from '../components/eventsSlider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <DrinkSlider />
      <CategoriesSlider />
      <EventsSlider/>
      <View style={styles.welcomeTextContainer}>
        <View style={styles.coctailMenu}>
          <ImageBackground source={require("../../assets/images/maintheme3.png")} style={styles.backgroundImage}>

          </ImageBackground>
          <Text style={styles.welcomeText}>
              Dowiedź się jak w prosty sposób przygotowywać drinki jak <Text style={styles.highlight}>prawdziwy barman</Text>
            </Text>
            <Text style={styles.description}>Tworzenie własnych drinków nie musi być trudne, z pomocą naszego mixera stworzysz najlepsze drinki na swoją imprezę</Text>
          <CustomButton title="Znajdź przepisy" />
        </View>
      </View>
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
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTextContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  welcomeText: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Bangers_400Regular',
    color: 'white',
    marginTop:20,
    // position: 'absolute',
    // bottom: 20,
    width: '80%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20
  },
  highlight:{
    color: '#9d53c3',
    textShadowRadius: 10
  },
  description:{
    fontSize:16,
    marginVertical:20,
    paddingHorizontal:20
  }
});
