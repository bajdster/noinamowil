import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const drinks = [{
    name:'Aperol Spritz',
    image: require('../../assets/images/drinks/aperol.png')
}, {
    name:'Cuba Libre',
    image: require('../../assets/images/drinks/cubalibre.png')
}, {
    name:'Mojito',
    image: require('../../assets/images/drinks/mojito.png')
},{
    name:'Daiquiri',
    image: require('../../assets/images/drinks/daiquiri.png')
},{
    name:'Pina Colada',
    image: require('../../assets/images/drinks/pina colada.png')
},{
    name:'Sex on the beach',
    image: require('../../assets/images/drinks/sotb.png')
},{
    name:'Whisky Sour',
    image: require('../../assets/images/drinks/whisky sour.png')
},]

const DrinkSlider = () => {
    const width = Dimensions.get('window').width;

    return (
        <View style={{ flex: 1, justifyContent:'center', alignItems:'center', marginTop:12 }}>
            <Carousel
                loop
                width={width}
                height={220}
                autoPlay={true}
                data={drinks}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Image source={item.image} style={{ width: 150, height: 200 }} />
                        <Text style={styles.drinkNameText}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default DrinkSlider;

const styles = StyleSheet.create({
    drinkNameText:
    {
        fontWeight:'bold',
        fontSize:16
    }
});
