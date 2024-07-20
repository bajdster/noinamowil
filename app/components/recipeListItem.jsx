import { Image, StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';

const RecipeListItem = ({ itemData }) => {
    const categories = itemData.item.category ? itemData.item.category.join(', ') : '';


    const openDrinkDetails = () =>
    {
      router.push({pathname:"/drinkDetail/drink", params:{title: itemData.item.title, id: itemData.item.id}})
    }

    return (
      <TouchableOpacity onPress={openDrinkDetails}>
        <View style={styles.listItemContainer}>
            <View>
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
    textContainer: {
        marginLeft: 10,
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
    }
});
