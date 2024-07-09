import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const EventsSlider = () => {
    const width = Dimensions.get('window').width;

    const categories = [
        { name: 'Bezalkoholowe', img: require("../../assets/images/eventsCat/noalko.jpg")},
        { name: 'Klasyki', img: require("../../assets/images/eventsCat/classic.jpg") },
        { name: 'Egzotyczne', img: require("../../assets/images/eventsCat/pinapple.jpg") },
        { name: 'Lekkie' , img: require("../../assets/images/eventsCat/light.jpg")},
        { name: 'Słodkie', img: require("../../assets/images/eventsCat/sweet.jpg") },
    ];

    const baseOptions = {
        vertical: false,
        width: width * 0.6,
        height: width * 0.6,
        style: {
          width: width
        },
    };

    return (
        <GestureHandlerRootView style={{ flex: 1, marginTop:20 }}>
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
        marginLeft:20,
    },
    categoriesBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cbbcf6',
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom:10,
    }
});
