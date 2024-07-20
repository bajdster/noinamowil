import { SafeAreaView, StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const MainLogo = () => {
  return (
    <TouchableOpacity onPress={() => router.replace("/")}>
        <SafeAreaView style={styles.logoContainer}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logoImage}/>
    </SafeAreaView>
    </TouchableOpacity>

  )
}

export default MainLogo

const styles = StyleSheet.create({
    logoContainer:{
        paddingTop:64,
        marginBottom:12,
        height:96,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red'
    },
    logoImage:{
        width:'35%',
        height:90
    }
})