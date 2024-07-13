import { ScrollView, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getRecipes } from '../../lib/recipeActions'

const Drinks = () => {

const [drinks, setDrinks] = useState()

useEffect(()=>
{
  const getDrinks = async function()
  {
    const drinks = await getRecipes()
    console.log(drinks.data[0].additional_info)
    setDrinks(drinks.data)
    return drinks
  }

  getDrinks()


}, [])


  return (
    //dodanie inputa wyszukiwarki (po nazwie, skladnikach itp)
    <ScrollView style={styles.drinksContainer}>
      <Text>Input wyszukiwarki</Text>
      <Text>Lista drinków</Text>
    </ScrollView>
  )
}

export default Drinks

const styles = StyleSheet.create({
  drinksContainer:{
    flex:1,
    padding:12
  }
})