import { ScrollView, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getRecipes } from '../../lib/recipeActions'
import supabase from '../../lib/supabaseClient'

const Drinks = () => {

const [drinks, setDrinks] = useState()


// useEffect(()=>
// {
//   async function getImages()
//   {
//     const { data, error } = await supabase.storage
//   .from('recipe-images')
//   .download('*')
//   return data
//   }

//   console.log(getImages())
// }, [])

useEffect(()=>
{
  const getDrinks = async () =>
  {
    const drinks = await getRecipes()
    console.log(drinks.data[0].image_url)
    setDrinks(drinks)
    return drinks
  }

  getDrinks()


}, [])


  return (
    //dodanie inputa wyszukiwarki (po nazwie, skladnikach itp)
    <ScrollView style={styles.drinksContainer}>
      <Text>Input wyszukiwarki</Text>
      <Text>Lista drinków</Text>
      <Image 
      source={{ uri: drinks.data[0].image_url }} 
      style={{ width: 200, height: 200 }}
    />
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