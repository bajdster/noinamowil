import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import { router } from 'expo-router';
import supabase from '../../lib/supabaseClient';

const MainLogo = () => {

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        Alert.alert(error.message);
    } else {
        Alert.alert('Wylogowano pomyślnie');
        router.replace('/');
    }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <SafeAreaView style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logoImage}/>
        </SafeAreaView>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Image source={require('../../assets/icons/logout.png')} style={styles.logoutImage}/>
      </TouchableOpacity>
    </View>
  );
}

export default MainLogo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
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
    width: 100, 
    height: 110, 
  },
  logoutImage: {
    width: 20, 
    height: 20, 
  },
});
