import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import supabase from '../../lib/supabaseClient';

const Favorites = () => {

  const [session, setSession] = useState(null);
  const [favoritesDrinks, setFavoritesDrinks] = useState(null);
  
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

  useEffect(() => {
    const getFavoritesDrinks = async () => {
        if (!session) return;

        const { data, error } = await supabase
            .from('drinks')
            .select(`
                *,
                favorites!inner(drink_id)
            `)
            .eq('favorites.user_id', session.user.id); // Filtrujemy na podstawie user_id z sesji

        if (error) {
            Alert.alert(error.message);
        } else {
            setFavoritesDrinks(data);
        }
    };

    getFavoritesDrinks();
}, [session]);


  console.log(favoritesDrinks)

  return (
    <View>
      <Text>Favorites</Text>
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({})

