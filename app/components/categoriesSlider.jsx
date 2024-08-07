import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const CategoriesSlider = () => {
    const width = Dimensions.get('window').width;

    const categories = [
        { name: 'Na bazie wódki', img: require("../../assets/images/categories/vodka.jpg"), alko: "wódka"},
        { name: 'Na bazie rumu', img: require("../../assets/images/categories/rum.jpg"), alko: "rum" },
        { name: 'Na bazie ginu', img: require("../../assets/images/categories/gin.jpg"), alko: 'gin'},
        { name: 'Na bazie tequili' , img: require("../../assets/images/categories/tequila.jpg"), alko: 'tequila'},
        { name: 'Na bazie whisky', img: require("../../assets/images/categories/whisky.jpg"), alko: "whisky" },
    ];

    const baseOptions = {
        vertical: false,
        width: width * 0.6,
        height: 220,
        style: {
          width: width
        },
    };

    function getDrinksWithAlkoHandler(alko)
    {
        // console.log(alko)
        router.push({pathname:"drinks", params:{paramsCategory: alko }})
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Text style={styles.title}>Ze względu na użyty alkohol</Text>
            <PanGestureHandler activeOffsetX={[-10, 10]}>
                <View>
                    <Carousel
                        {...baseOptions}
                        loop
                        autoPlay={true}
                        data={categories}
                        scrollAnimationDuration={2000}
                        renderItem={({ item }) => (
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={()=> {getDrinksWithAlkoHandler(item.alko)}}>
                                    <ImageBackground source={item.img} style={[styles.categoriesBox, { width: width * 0.5 }]}>
                                    </ImageBackground>
                                    <Text style={styles.drinkNameText}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

export default CategoriesSlider;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: 20,
        marginBottom: 16
    },
    drinkNameText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft:20,
        marginTop: 10,
    },
    categoriesBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cbbcf6',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom:10,
    }
});
