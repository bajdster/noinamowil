import { Image, StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Link, router } from 'expo-router';
import supabase from '../../lib/supabaseClient';

const RecipeListItem = ({ itemData }) => {
    const categories = itemData.item.category ? itemData.item.category.join(', ') : '';

    const [session, setSession] = useState(null);
  
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


    const openDrinkDetails = () =>
    {
      router.push({pathname:"/drinkDetail/drink", params:{title: itemData.item.title, id: itemData.item.id}})
    }

    const bookmarkHandler = async () =>
    {
        const { data, error } = await supabase
        .from('favorites')
        .insert([
        { user_id: session.user.id, drink_id: itemData.item.id},
        ]);
    }

    return (
      <TouchableOpacity onPress={openDrinkDetails}>
        <View style={styles.listItemContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: itemData.item.image_url }} style={{ width: 60, height: 60 }} />
            </View>

            <View style={styles.textContainer}>
                <View>
                    {itemData && <Text style={styles.title}>{itemData.item.title}</Text>}
                </View>
                <View style={styles.details}>
                    {categories ? (
                        <Text style={styles.categories}>Kategoria: {categories}</Text>
                    ) : (
                        <Text style={styles.categories}>Kategoria: -</Text>
                    )}
                </View>
                <View style={styles.details}>
                    <Text></Text>
                    <Text style={styles.categories}>Główny alkohol: {itemData.item.main_alcohol}</Text>
                </View>

            </View>
            
            <TouchableOpacity onPress={bookmarkHandler} style={styles.bookmarkContainer}>
                    <Image source={require("../../assets/icons/bookmark.png")} style={styles.bookmark}/>
            </TouchableOpacity>
        </View>
        </TouchableOpacity>
    );
};

export default RecipeListItem;

const styles = StyleSheet.create({
    listItemContainer: {
        height: 96,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 8,
        marginVertical: 4,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    imageContainer:{
        flex:1
    },
    textContainer: {
        marginLeft: 10,
        flex:3
    },
    bookmarkContainer:{
        flex:1,
        alignItems:'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    categories: {
        fontSize: 14,
        color: 'gray',
    },
    details:{
      flexDirection:'row'
    },
    bookmark:{
        width:25,
        height:25,
        tintColor:'lightgray',
    }
});
