import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import DrinkSlider from '../components/drinkSlider'
import { useFonts, Bangers_400Regular } from '@expo-google-fonts/bangers';
import CustomButton from '../components/customButton';
import CategoriesSlider from '../components/categoriesSlider';

const Home = () => {

  let [fontsLoaded] = useFonts({
    Bangers_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Możesz dodać wskaźnik ładowania tutaj
  }

  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
      <DrinkSlider />
      <CategoriesSlider />
      <View style={styles.welcomeTextContainer}>
        <View style={styles.coctailMenu}>
          <ImageBackground source={require("../../assets/images/maintheme3.png")} style={styles.backgroundImage}>
            <Text style={styles.welcomeText}>
              Dowiedź się jak w prosty sposób przygotowywać drinki jak prawdziwy barman
            </Text>
          </ImageBackground>
          <CustomButton title="Znajdź przepisy" />
        </View>
      </View>
    </ScrollView>
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
    height: 180,
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
    position: 'absolute',
    bottom: 20,
    width: '80%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
});
