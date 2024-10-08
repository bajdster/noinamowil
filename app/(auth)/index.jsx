import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { loadSession } from '../../lib/recipeActions'; // Import funkcji loadSession

const Auth = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [loading, setLoading] = useState(true); // Zmieniony na true, aby rozpocząć ładowanie od razu
    const [session, setSession] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            const session = await loadSession();
            if (session) {
                // Jeśli sesja istnieje, przekieruj użytkownika do ekranu 'tabs'
                router.push("(tabs)");
            } else {
                // Jeśli sesja nie istnieje, ustaw loading na false
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const saveSession = async (session) => {
        try {
            await AsyncStorage.setItem('session', JSON.stringify(session));
        } catch (error) {
            console.error('Error saving session:', error);
        }
    };

    const changeModeHandler = () => {
        setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    };

    const signInWithEmail = async () => {
        setLoading(true);
        const { error, data } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            Alert.alert("Nieprawidłowy login lub hasło");
        } else {
            await saveSession(data.session);
            Alert.alert("Zalogowano pomyślnie");
            router.push("(tabs)");
        }
    };

    const signUpWithEmail = async () => {
        if (password !== repeatedPassword) {
            Alert.alert('Hasła nie są identyczne.');
            return;
        }

        setLoading(true);
        const { error, data } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            Alert.alert(error.message);
        } else {
            await saveSession(data.session);
            Alert.alert('Pomyślnie udało Ci się zarejestrować !');
            router.push("(tabs)");
        }
    };

    // Wyświetl spinner ładowania lub formularz logowania w zależności od stanu loading
    if (loading) {
        return <View style={styles.authContainer}><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.authContainer}>
            <Image source={require("../../assets/images/logo.png")} style={{ width: 300, height: 300 }} />
            <View style={styles.credentials}>
                {mode === "login" ? (
                    <View>
                        <View>
                            <Text style={styles.inputCredentialsText}>E-mail</Text>
                            <TextInput style={styles.input} onChangeText={setEmail} value={email} />
                        </View>
                        <View>
                            <Text style={styles.inputCredentialsText}>Hasło</Text>
                            <TextInput style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />
                        </View>
                    </View>
                ) : (
                    <View>
                        <View>
                            <Text style={styles.inputCredentialsText}>E-mail</Text>
                            <TextInput style={styles.input} onChangeText={setEmail} value={email} />
                        </View>
                        <View>
                            <Text style={styles.inputCredentialsText}>Hasło</Text>
                            <TextInput style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />
                        </View>
                        <View>
                            <Text style={styles.inputCredentialsText}>Powtórz hasło</Text>
                            <TextInput style={styles.input} secureTextEntry onChangeText={setRepeatedPassword} value={repeatedPassword} />
                        </View>
                    </View>
                )}

                <TouchableOpacity style={styles.authButton} onPress={mode === "login" ? signInWithEmail : signUpWithEmail}>
                    <Text style={styles.authButtonText}>{mode === "login" ? 'Zaloguj się' : "Zarejestruj się"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.authInfo} onPress={changeModeHandler}>
                    <Text style={styles.authInfoText}>{mode === 'login' ? 'Nie masz konta? Zarejestruj się' : 'Masz konto? Zaloguj się'}</Text>
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
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    authButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    authInfo: {
        marginTop: 20,
    },
    authInfoText: {
        textDecorationLine: 'underline',
    },
});
