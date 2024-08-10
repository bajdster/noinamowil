import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

const Auth = () => {

    const [mode, setMode] = useState('login')

  return (
    <View style={styles.authContainer}>
      <Image source={require("../../assets/images/logo.png")} style={{ width: 300, height: 300 }} />
      <View style={styles.credentials}>
        <View>
          <Text style={styles.inputCredentialsText}>Login</Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.inputCredentialsText}>Hasło</Text>
          <TextInput style={styles.input} secureTextEntry />
        </View>

        <TouchableOpacity style={styles.authButton}>
          <Text style={styles.authButtonText}>Zaloguj się</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authInfo}>
            <Text style={styles.authInfoText}>Nie masz konta? Zarejestruj się</Text>
        </TouchableOpacity>
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
    backgroundColor: '#8dc6ff',
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
