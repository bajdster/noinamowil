import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const MainLogo = () => {
  return (
    <SafeAreaView style={styles.logoContainer}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logoImage}/>
    </SafeAreaView>
  )
}

export default MainLogo

const styles = StyleSheet.create({
    logoContainer:{
        paddingTop:64,
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