import { Text, StyleSheet, Image, FlatList, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getRecipes } from '../../lib/recipeActions'
import supabase from '../../lib/supabaseClient'
import RecipeListItem from '../components/recipeListItem'
import DrinkContextProvider from '../../store/drink-context'
import { DrinkContext } from '../../store/drink-context'
import FilterInput from '../components/filterInput'

const Drinks = () => {

const drinksCtx = useContext(DrinkContext)

useEffect(()=>
{
  const getDrinks = async () =>
  {
    const drinks = await getRecipes()
    drinksCtx.fetchDrinksList(drinks)
  }
  getDrinks()
}, [])

function renderListItem(itemData)
{
  return (

  <RecipeListItem itemData={itemData}/>
  )
}

//teraz tu trzeba dodać obsługe state aby filtrowananie działąło na kopii
function filterDrinks(filterText)
{
  console.log(filterText)
}

  return (
    //dodanie inputa wyszukiwarki (po nazwie, skladnikach itp)
    <View style={styles.drinksContainer}>
      <FilterInput onFilter={filterDrinks}/>
      <Text>Sekcja szybkich filtrów</Text>
      <Text style={styles.drinkListTitle}>Lista drinków</Text>
      {drinksCtx.drinks ? <FlatList data={drinksCtx.drinks.data} keyExtractor={(item, index) => item.id} renderItem={renderListItem} style={styles.recipeList}/> : <Text>Loading...</Text>}
    </View>
  )
}

export default Drinks

const styles = StyleSheet.create({
  drinksContainer:{
    flex:1,
    padding:12
  },
  recipeList:{
    // backgroundColor:"lightgray",
    width:'100%'
  },
  drinkListTitle:{
    fontSize:16,
    fontWeight:'bold'
  }
})