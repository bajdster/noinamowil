import { Text, StyleSheet, Image, FlatList, View, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getRecipes } from '../../lib/recipeActions'
import supabase from '../../lib/supabaseClient'
import RecipeListItem from '../components/recipeListItem'
import DrinkContextProvider from '../../store/drink-context'
import { DrinkContext } from '../../store/drink-context'
import FilterInput from '../components/filterInput'
import { Picker } from '@react-native-picker/picker';

const Drinks = () => {
  const drinksCtx = useContext(DrinkContext)
  const [filteredText, setFilteredText] = useState('')
  const [drinks, setDrinks] = useState([])
  const catagories = ["klasyczny", "orzeźwiający", "lekki", "bezalkoholowy", "egzotyczny", "słodki"]
  const alkos = ["rum", "wódka", "whisky", "gin", "wino białe", "wino czerwone", "aperol", "piwo", "likier", "tequila", "prosecco"]

  const [selectedCategory, setSelectedCategory] = useState("wszystkie");
  const [selectedAlko, setSelectedAlko] = useState("wszystkie");
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getDrinks()
  }, [])

  const getDrinks = async () => {
    const drinks = await getRecipes()
    drinksCtx.fetchDrinksList(drinks)
    setDrinks(drinks.data)
  }

  const onRefresh = async () =>
  {
    setRefreshing(true)
    await getDrinks()
    setRefreshing(false)
  }
  
  function filterDrinks(filterText) {
    setFilteredText(filterText)
  }

  function clearFilter() {
    setFilteredText('')
    setSelectedCategory('wszystkie')
    setSelectedAlko('wszystkie')
    setDrinks(drinksCtx.drinks.data)
  }

  useEffect(() => {
    let filteredDrinks = drinksCtx.drinks.data;

    if (filteredText) {
      filteredDrinks = filteredDrinks.filter(drink => drink.title.toLowerCase().includes(filteredText.toLowerCase()));
    }

    if (selectedCategory !== 'wszystkie') {
      filteredDrinks = filteredDrinks.filter(drink => drink.category && drink.category.includes(selectedCategory.toLowerCase()));
    }

    if (selectedAlko !== 'wszystkie') {
      filteredDrinks = filteredDrinks.filter(drink => drink.main_alcohol === selectedAlko.toLowerCase());
    }

    setDrinks(filteredDrinks);
  }, [filteredText, selectedCategory, selectedAlko]);

  return (
    <View style={styles.drinksContainer}>
      <FilterInput onFilter={filterDrinks} clearFilter={clearFilter}/>
      <View style={styles.filters}>
        <View style={{width:'50%'}}>
          <Text style={styles.drinkListTitle}>Kategoria</Text>
          <Picker
            mode='dropdown'
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }>
            <Picker.Item label="Wszystkie" value="wszystkie"/>
            {catagories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category}/>
            ))}
          </Picker>
        </View>
        <View style={{ width:'50%'}}>
          <Text style={styles.drinkListTitle}>Użyty alkohol</Text>
          <Picker
            mode='dropdown'
            selectedValue={selectedAlko}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedAlko(itemValue)
            }>
            <Picker.Item label="Wszystkie" value="wszystkie"/>
            {alkos.map((alko, index) => (
              <Picker.Item key={index} label={alko} value={alko}/>
            ))}
          </Picker>
        </View>
      </View>
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', height:30, alignItems:'center'}}>
        <Text style={styles.drinkListTitle}>Lista drinków</Text>
        {(selectedAlko !=='wszystkie' || selectedCategory !=="wszystkie") &&<TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilter}><Text style={{color:'white'}}>Usuń filtry</Text></TouchableOpacity>}
      </View>
      {drinks ? <FlatList data={drinks} keyExtractor={(item, index) => item.id} renderItem={(itemData)=> <RecipeListItem itemData={itemData}/>} style={styles.recipeList} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}/> : 
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color="#f76b8a"/>
      </View>}
    </View>
  )
}

export default Drinks

const styles = StyleSheet.create({
  drinksContainer: {
    flex: 1,
    padding: 12
  },
  recipeList: {
    width: '100%'
  },
  drinkListTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  filters: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  clearFiltersButton:{
    backgroundColor:'#f76b8a',
    padding:6,
    borderRadius:10
  }
})
