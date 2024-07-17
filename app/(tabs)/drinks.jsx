import { Text, StyleSheet, Image, FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getRecipes } from '../../lib/recipeActions'
import supabase from '../../lib/supabaseClient'
import RecipeListItem from '../components/recipeListItem'

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
    // console.log(drinks.data[0].image_url)
    setDrinks(drinks)
    return drinks
  }

  getDrinks()
  console.log(drinks)


}, [])

function renderListItem(itemData)
{
  // console.log(itemData.item.title)
  return <RecipeListItem itemData={itemData}/>
}

  return (
    //dodanie inputa wyszukiwarki (po nazwie, skladnikach itp)
    <View style={styles.drinksContainer}>
      <Text>Input wyszukiwarki</Text>
      <Text>Lista drinków</Text>
      {drinks ? <FlatList data={drinks.data} keyExtractor={(item, index) => item.id} renderItem={renderListItem}/> : <Text>Loading</Text>}
      
      {drinks ? <Image 
      source={{ uri: drinks.data[0].image_url }} 
      style={{ width: 200, height: 200 }}
    /> : <Text>Loading...</Text>}
    </View>
  )
}

export default Drinks

const styles = StyleSheet.create({
  drinksContainer:{
    flex:1,
    padding:12
  }
})