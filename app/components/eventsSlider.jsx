import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const EventsSlider = () => {
    const width = Dimensions.get('window').width;

    const categories = [
        { name: 'Bezalkoholowe', img: require("../../assets/images/eventsCat/noalko.jpg"), category: 'bezalkoholowy'},
        { name: 'Klasyki', img: require("../../assets/images/eventsCat/classic.jpg"), category: 'klasyczny' },
        { name: 'Egzotyczne', img: require("../../assets/images/eventsCat/pinapple.jpg"), category: 'egzotyczny' },
        { name: 'Lekkie' , img: require("../../assets/images/eventsCat/light.jpg"), category: 'lekki'},
        { name: 'Słodkie', img: require("../../assets/images/eventsCat/sweet.jpg") , category: 'słodki'},
    ];

    const baseOptions = {
        vertical: false,
        width: width * 0.6,
        height: width * 0.6,
        style: {
          width: width
        },
    };

    function getDrinksWithCategoriesHandler(category)
    {
        router.push({pathname:"drinks", params:{paramsCategory: category }})
    }

    return (
        <GestureHandlerRootView style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
            <Text style={styles.title}>W zależności od okazji</Text>
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
                                <TouchableOpacity style={{ alignItems: 'center' }} onPress={()=> {getDrinksWithCategoriesHandler(item.category)}}>
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

export default EventsSlider;

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
        marginTop: 10,
        textAlign:'center'
    },
    categoriesBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cbbcf6',
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: 10,
    }
});
