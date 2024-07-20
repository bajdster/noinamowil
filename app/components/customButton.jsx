import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFonts, Bangers_400Regular } from '@expo-google-fonts/bangers';
import { router } from 'expo-router';

const CustomButton = ({title}) => {

    let [fontsLoaded] = useFonts({
        Bangers_400Regular,
      });

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={()=> router.push('/drinks')}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonContainer:{
        height:48,
        borderRadius:40,
        width:'60%',
        backgroundColor:"#00a6f9",
        marginVertical:16,
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'black',
    },
    buttonText:
    {
       color: 'white',
       fontSize:14,
       textTransform:'uppercase',
       fontWeight:'bold',
    //    fontFamily: 'Bangers_400Regular',
    //    width:200,
        paddingHorizontal:16,
       textAlign:'center',
       textShadowColor: 'rgba(0, 0, 0, 0.75)',
       textShadowOffset: { width: -1, height: 1 },
       textShadowRadius: 20
    }
})