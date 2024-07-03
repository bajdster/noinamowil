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
        // width:'80%',
        height:48,
        // borderWidth:3,
        borderRadius:40,
        // borderColor:'#a56cc1',
        backgroundColor:"white",
        marginVertical:16,
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'black',
    },
    buttonText:
    {
       color: 'black',
       fontSize:18,
       textTransform:'uppercase',
       fontWeight:'bold',
    //    fontFamily: 'Bangers_400Regular',
    //    width:200,
        paddingHorizontal:16,
       textAlign:'center',
       textShadowColor:'black',
    }
})