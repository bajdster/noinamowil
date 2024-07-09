import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const CategoriesSlider = () => {
    const width = Dimensions.get('window').width;

    const categories = [
        { name: 'Na bazie wódki', img: require("../../assets/images/categories/vodka.jpg")},
        { name: 'Na bazie rumu', img: require("../../assets/images/categories/rum.jpg") },
        { name: 'Na bazie ginu', img: require("../../assets/images/categories/gin.jpg") },
        { name: 'Na bazie tequili' , img: require("../../assets/images/categories/tequila.jpg")},
        { name: 'Na bazie whisky', img: require("../../assets/images/categories/whisky.jpg") },
    ];

    const baseOptions = {
        vertical: false,
        width: width * 0.6,
        height: 220,
        style: {
          width: width
        },
    };

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
                            <>
                                <ImageBackground source={item.img} style={[styles.categoriesBox, { width: width * 0.5 }]}>
                                </ImageBackground>
                                <Text style={styles.drinkNameText}>{item.name}</Text>
                            </>
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
