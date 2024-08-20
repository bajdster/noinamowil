import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import { router } from 'expo-router';


const MainLogo = () => {


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <SafeAreaView style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logoImage}/>
        </SafeAreaView>
      </TouchableOpacity>

    </View>
  );
}

export default MainLogo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center', 
    paddingTop: 64,
    paddingHorizontal: 20, 
    width: '100%',
    height: 120, 
  },
  logoContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  logoImage: {
    width: 140, 
    height: 140, 
  },
  logoutImage: {
    width: 20, 
    height: 20, 
  },
});
