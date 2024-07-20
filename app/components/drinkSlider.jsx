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
        <View style={{ flex: 1, justifyContent:'center', alignItems:'center', marginTop:100, marginBottom:20 }}>
            <Text style={styles.title}>Propozycje dla Ciebie</Text>
            <Carousel
                loop
                width={width}
                height={220}
                autoPlay={true}
                data={drinks}
                scrollAnimationDuration={1000}
                panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
                }}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width:'100%' }}>
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
    title:{
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'flex-start',
        paddingLeft:20,
        marginBottom:10
    },
    drinkNameText:
    {
        fontWeight:'bold',
        fontSize:16
    }
});
