import { Text, StyleSheet, Image, FlatList, View, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getRecipes } from '../../lib/recipeActions'
import supabase from '../../lib/supabaseClient'
import RecipeListItem from '../components/recipeListItem'
import DrinkContextProvider from '../../store/drink-context'
import { DrinkContext } from '../../store/drink-context'
import FilterInput from '../components/filterInput'
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router'
import { loadSession } from '../../lib/recipeActions';

const Drinks = () => {
  const {paramsCategory} = useLocalSearchParams()
  const drinksCtx = useContext(DrinkContext)
  const [filteredText, setFilteredText] = useState('')
  const [drinks, setDrinks] = useState([])
  const [session, setSession] = useState(null);
  const catagories = ["klasyczny", "orzeźwiający", "lekki", "bezalkoholowy", "egzotyczny", "słodki"]
  const alkos = ["rum", "wódka", "whisky", "gin", "wino białe", "wino czerwone", "aperol", "piwo", "likier", "tequila", "prosecco"]

  const [selectedCategory, setSelectedCategory] = useState("wszystkie");
  const [selectedAlko, setSelectedAlko] = useState("wszystkie");
  const [refreshing, setRefreshing] = useState(false)
  const [sortOrder, setSortOrder] = useState('asc'); 


  useEffect(() => {
    const loadSessionFromAsyncStorage = async () => {
      const session = await loadSession()
      setSession(session)
    };

    loadSessionFromAsyncStorage();
}, []);

  const getFavoritesDrinks = async () => {
    if (!session) return;

    const { data, error } = await supabase
      .from('drinks')
      .select(`
        *,
        favorites!inner(drink_id)
      `)
      .eq('favorites.user_id', session.user.id);

    if (error) {
      Alert.alert(error.message);
    } else {
        drinksCtx.fetchFavoritesDrinks(data)
    }
  };

  useEffect(() => {
    getFavoritesDrinks();
  }, [session]);
  
  // Set category and alcohol type from params
  useEffect(() => {
    if(paramsCategory && catagories.includes(paramsCategory)) {
      setSelectedCategory(paramsCategory)
    }
    if(paramsCategory && alkos.includes(paramsCategory)) {
      setSelectedAlko(paramsCategory)
    }
  }, [paramsCategory])

  // Fetch drinks
  useEffect(() => {
    getDrinks()
  }, [])

  const getDrinks = async () => {
    const drinks = await getRecipes()
    drinksCtx.fetchDrinksList(drinks)
    setDrinks(drinks.data)
  }

  const onRefresh = async () => {
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

  function changeSortingAlphabetically() {
    setSortOrder((prevSortOrder) => {
      const newSortOrder = prevSortOrder === 'asc' ? 'desc' : 'asc';
      
      // Aktualizacja listy drinków z nowym porządkiem sortowania
      let sortedDrinks = [...drinks]; // Kopiujemy bieżącą listę drinków
  
      sortedDrinks = sortedDrinks.sort((a, b) => {
        if (newSortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
  
      // Aktualizacja stanu z posortowaną listą drinków
      setDrinks(sortedDrinks);
      return newSortOrder; // Zwracamy nowy stan sortowania
    });
  }

  // Apply filters
  useEffect(() => {
    if (!drinksCtx.drinks || !drinksCtx.drinks.data) return;
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

    if (sortOrder) {
      filteredDrinks = filteredDrinks.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else if (sortOrder === 'desc') {
          return b.title.localeCompare(a.title);
        }
      });
    }

    setDrinks(filteredDrinks);
  }, [filteredText, selectedCategory, selectedAlko, drinksCtx.drinks.data, sortOrder]);

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
            <Picker.Item label={"Wszystkie"} value="wszystkie"/>
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
        <Text style={styles.drinkListTitle}>Lista drinków {drinks && drinks.length}</Text>
        {(selectedAlko !=='wszystkie' || selectedCategory !=="wszystkie") &&<TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilter}><Text style={{color:'white'}}>Usuń filtry</Text></TouchableOpacity>}
      </View>
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', height:30, alignItems:'center', marginVertical:4}}>
          <TouchableOpacity style={styles.sortAlphabeticallyButton} onPress={changeSortingAlphabetically}>
            <Text>Sortuj: {sortOrder === 'desc' ?'A-Z': 'Z-A'}</Text>
          </TouchableOpacity>
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
  },
  sortAlphabeticallyButton:{
    backgroundColor:'lightgray',
    paddingHorizontal:8,
    paddingVertical: 6,
    borderRadius:6
  }
})
