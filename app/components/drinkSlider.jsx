import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { router } from 'expo-router';

const drinks = [{
    name:'Aperol Spritz',
    image: require('../../assets/images/drinks/aperol.png'),
    id: 4
}, {
    name:'Cuba Libre',
    image: require('../../assets/images/drinks/cubalibre.png'),
    id: 2
}, {
    name:'Mojito',
    image: require('../../assets/images/drinks/mojito.png'),
    id:1
},{
    name:'Daiquiri',
    image: require('../../assets/images/drinks/daiquiri.png'),
    id: 3
},{
    name:'Pina Colada',
    image: require('../../assets/images/drinks/pina colada.png'),
    id: 5
},{
    name:'Sex on the beach',
    image: require('../../assets/images/drinks/sotb.png'),
    id: 6
},{
    name:'Whisky Sour',
    image: require('../../assets/images/drinks/whisky sour.png'),
    id: 7
},]

const DrinkSlider = () => {
    const width = Dimensions.get('window').width;

    
  const openDrinkDetails = ({name, id}) =>
    {
        console.log(name, id)
      router.push({pathname:"../drinkDetail/drink", params:{title: name, id: id}})
    }

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
                    <TouchableOpacity onPress={()=>{openDrinkDetails({name:item.name, id: item.id})}} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width:'100%' }}>
                            <Image source={item.image} style={{ width: 150, height: 200 }} />
                            <Text style={styles.drinkNameText}>{item.name}</Text>
                    </TouchableOpacity>
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
        fontSize:16,
        textAlign:'center'
    }
});
