import { Image, StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import supabase from '../../lib/supabaseClient';
import { DrinkContext } from '../../store/drink-context';
import { loadSession } from '../../lib/recipeActions';

const RecipeListItem = ({ itemData }) => {
    const categories = itemData.item.category ? itemData.item.category.join(', ') : '';
    const [session, setSession] = useState(null);
    const ctx = useContext(DrinkContext);

    useEffect(() => {
        const loadSessionFromAsyncStorage = async () => {
            const session = await loadSession();
            setSession(session);
        };
        loadSessionFromAsyncStorage();
    }, []);

    // Dynamiczne sprawdzanie, czy drink jest w ulubionych na podstawie kontekstu
    const isItemFavorite = ctx.favDrinks.some(favDrink => favDrink.id === itemData.item.id);

    const openDrinkDetails = () => {
        router.push({ pathname: "/drinkDetail/drink", params: { title: itemData.item.title, id: itemData.item.id } });
    };

    const bookmarkHandler = async () => {
        if (isItemFavorite) {
            // Usuń z ulubionych
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', session.user.id)
                .eq('drink_id', itemData.item.id);

            if (error) {
                console.error("Error removing favorite:", error);
            } else {
                ctx.removeFavDrink(itemData.item.id); // Zaktualizuj stan w kontekście
            }
        } else {
            // Dodaj do ulubionych
            const { error } = await supabase
                .from('favorites')
                .insert([{ user_id: session.user.id, drink_id: itemData.item.id }]);

            if (error) {
                console.error("Error adding favorite:", error);
            } else {
                ctx.addFavDrink(itemData.item); // Zaktualizuj stan w kontekście
            }
        }
    };

    return (
        <TouchableOpacity onPress={openDrinkDetails}>
            <View style={styles.listItemContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: itemData.item.image_url }} style={{ width: 60, height: 60 }} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <Text style={styles.categories}>Kategoria: {categories || '-'}</Text>
                    <Text style={styles.categories}>Główny alkohol: {itemData.item.main_alcohol}</Text>
                </View>

                <TouchableOpacity onPress={bookmarkHandler} style={styles.bookmarkContainer}>
                    <Image
                        source={require("../../assets/icons/bookmark.png")}
                        style={[styles.bookmark, isItemFavorite && { tintColor: 'black' }]}
                    />
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
    imageContainer: {
        flex: 1,
    },
    textContainer: {
        marginLeft: 10,
        flex: 3,
    },
    bookmarkContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    categories: {
        fontSize: 14,
        color: 'gray',
    },
    bookmark: {
        width: 25,
        height: 25,
        tintColor: 'lightgray',
    },
});
