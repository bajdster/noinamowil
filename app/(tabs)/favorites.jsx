import { StyleSheet, Text, View, ActivityIndicator, FlatList, RefreshControl, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import supabase from '../../lib/supabaseClient';
import RecipeListItem from '../components/recipeListItem';
import { DrinkContext } from '../../store/drink-context';

const Favorites = () => {
  const [session, setSession] = useState(null);
  const [favoritesDrinks, setFavoritesDrinks] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const ctx = useContext(DrinkContext)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        Alert.alert(error.message);
        return;
      }
      setSession(session);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
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
    //   setFavoritesDrinks(data);
        ctx.fetchFavoritesDrinks(data)
    }
  };

  useEffect(() => {
    getFavoritesDrinks();
  }, [session]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getFavoritesDrinks();
    } catch (error) {
      console.error('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.drinkListTitle}>
          Ulubione drinki {ctx.favDrinks && ctx.favDrinks.length}
        </Text>
      </View>
      {ctx.favDrinks ? (
        <FlatList
          data={ctx.favDrinks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => <RecipeListItem itemData={itemData} />}
          style={styles.recipeList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color="#f76b8a" />
        </View>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    height: 30,
    alignItems: 'center',
  },
  drinkListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeList: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
