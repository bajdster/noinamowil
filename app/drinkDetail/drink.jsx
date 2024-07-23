import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getRecipe } from '../../lib/recipeActions'

const Drink = () => {
  const { title, id } = useLocalSearchParams()
  const [drink, setDrink] = useState(null)

  useEffect(() => {
    const fetchDrinkInfo = async () => {
      const { data, error } = await getRecipe(id)
      if (error) {
        console.error('Error fetching recipe:', error.message)
      } else {
        console.log('Fetched recipe:', data)
        setDrink(data)
      }
    }

    if (id) {
      fetchDrinkInfo()
    }
  }, [id])

  let formattedCategory = "-"
  if (drink && drink[0] && drink[0].category) {
    formattedCategory = drink[0].category.join(" ")
  }

  return (
    <ScrollView style={styles.drinkMainContainer}>
      {drink ? (
        <>
          <Text style={styles.mainTitle}>{drink[0]?.title}</Text>
          <View style={styles.details}>
            <Image source={{uri: drink[0]?.image_url}} style={{width: 200, height: 200}} />
            <View style={styles.info}>
              {drink[0].category && <Text style={styles.categories}>{formattedCategory}</Text>}
              <Text style={styles.drinkSecondaryTitle}>Detale</Text>
              <Text> 
                <Text style={styles.bolded}>Główny alkohol:</Text> {drink[0]?.main_alcohol}
              </Text>
              <Text>{drink[0]?.additional_info}</Text>
            </View>
          </View>
          <View style={styles.ingredients}>
            <Text style={styles.drinkSecondaryTitle}>Składniki</Text>
            <Text>{drink[0]?.ingredients}</Text>
          </View>
          <View style={styles.ingredients}>
            <Text style={styles.drinkSecondaryTitle}>Przepis</Text>
            <Text>{drink[0]?.instructions}</Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  )
}

export default Drink

const styles = StyleSheet.create({
  drinkMainContainer: {
    paddingHorizontal: 20,
    paddingVertical:12,
    flex: 1,
    marginBottom:12
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center",
    color:'#0092ca'
  },
  details: {
    flexDirection: 'row',
    backgroundColor:'white',
    borderRadius:10
  },
  categories: {
    backgroundColor: "#edb1f1",
    padding: 4,
    width: 100,
    borderRadius: 4,
    textAlign: 'center'
  },
  info:{
    justifyContent:'space-around',
    flex:1,
    // backgroundColor:'red'
  },
  ingredients:{
    // backgroundColor:'red',
    padding:12,
  },
  drinkSecondaryTitle:{
    fontWeight:'bold',
    fontSize:20,
    marginBottom:8
  },
  bolded:{
    fontWeight:'bold'
  }
})
