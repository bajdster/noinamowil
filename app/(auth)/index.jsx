import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Link } from 'expo-router';
import supabase from '../../lib/supabaseClient';

const Auth = () => {

    const [mode, setMode] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
  function changeModeHandler()
  {
    setMode((prev)=>
    {
      return prev === 'login' ? "signup" : 'login'
    })
  }

async function signInWithEmail() {
  setLoading(true)
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) Alert.alert(error.message)
  if(!error) Alert.alert("Zalogowano pomyślnie")
  setLoading(false)
}

async function signUpWithEmail() {
  setLoading(true)
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (error) Alert.alert(error.message)
  if (!session && !error) Alert.alert('Pomyślnie udało Ci się zarejestrować !')
  setLoading(false)
}

  return (
    <View style={styles.authContainer}>
      <Image source={require("../../assets/images/logo.png")} style={{ width: 300, height: 300 }} />
      <View style={styles.credentials}>
        {mode=== "login" ? <View>
          <View>
            <Text style={styles.inputCredentialsText}>E-mail</Text>
            <TextInput style={styles.input} />
          </View>
          <View>
            <Text style={styles.inputCredentialsText}>Hasło</Text>
            <TextInput style={styles.input} secureTextEntry />
          </View>
        </View>
        :
        <View>
            <View>
              <Text style={styles.inputCredentialsText}>E-mail</Text>
              <TextInput style={styles.input} onChangeText={(email)=> setEmail(email)} />
            </View>
            <View>
              <Text style={styles.inputCredentialsText}>Hasło</Text>
              <TextInput style={styles.input} secureTextEntry onChangeText={(password)=> setPassword(password)}/>
            </View>
            <View>
              <Text style={styles.inputCredentialsText}>Powtórz hasło</Text>
              <TextInput style={styles.input} secureTextEntry onChangeText={(repeatedPassword)=> setRepeatedPassword(repeatedPassword)}/>
            </View>
        </View>}

        <TouchableOpacity style={styles.authButton} onPress={mode === "login" ? signInWithEmail : signUpWithEmail}>
            <Text style={styles.authButtonText}>{mode === "login" ? 'Zaloguj się' : "Zarejestruj się"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authInfo} onPress={changeModeHandler} >
            <Text style={styles.authInfoText}>{mode === 'login' ? 'Nie masz konta? Zarejestruj się' : 'Masz konto? Zaloguj się'}</Text>
        </TouchableOpacity>

        <Link href="(tabs)" style={{marginTop:30, padding: 8, backgroundColor:'pink', width:'50%', borderRadius: 10, textAlign:'center'}}>Kontynuuj jako gość</Link>
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  credentials: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    borderRadius: 8,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 4, // Shadow for iOS
  },
  inputCredentialsText: {
    fontWeight: 'bold',
  },
  authButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00a6f9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.3, // Shadow for iOS
    shadowRadius: 4, // Shadow for iOS
    elevation: 5, // Shadow for Android
  },
  authButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  authInfo:{
    marginTop:20,
  },
  authInfoText:{
    textDecorationLine:'underline'
  }
});
