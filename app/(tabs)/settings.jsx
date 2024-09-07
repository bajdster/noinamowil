import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { loadSession } from '../../lib/recipeActions';

const Settings = () => {

  const logout = async () => {
    try {
      // Wylogowanie z Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert('Error', error.message);
        return;
      }
      
      // Usunięcie sesji z AsyncStorage
      await AsyncStorage.removeItem('session');
      
      // Potwierdzenie wylogowania
      Alert.alert('Wylogowano pomyślnie');
      
      // Przekierowanie do strony logowania
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging out.');
    }
  };

  const [session, setSession] = useState(null);

  useEffect(() => {
    const loadSessionFromAsyncStorage = async () => {
      const session = await loadSession();
      setSession(session);
    };

    loadSessionFromAsyncStorage();
  }, []);

  return (
    <View style={styles.settingsContainer}>
      <View style={styles.userInfoContainer}>
        <Image
          source={require("../../assets/icons/profile.png")}
          style={styles.userImage}
        />
        {session && session.user && (
          <>
            <Text style={styles.userEmail}>{session.user.email}</Text>
            <Text style={styles.userInfoText}>Konto utworzone: {new Date(session.user.created_at).toLocaleDateString()}</Text>
            <Text style={styles.userInfoText}>Ostatnio zalogowany: {new Date(session.user.last_sign_in_at).toLocaleDateString()}</Text>
          </>
        )}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Wyloguj</Text>
        <Image source={require('../../assets/icons/logout.png')} style={styles.logoutImage} />
      </TouchableOpacity>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({

    settingsContainer:{
        flex:1,
        padding:30,
        backgroundColor:'#f4f4f4',
    },
    userInfoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    userImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginBottom: 20,
    },
    userEmail: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    userInfoText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    logoutButton:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FF5A5F',
        padding:15,
        borderRadius:8,
    },
    logoutButtonText:{
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight:10
    },
    logoutImage:{
        width:20,
        height:20,
        tintColor: 'white',
    }
})
