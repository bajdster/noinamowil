import supabase from "./supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getRecipes()
{
    const {data, error} = await supabase
    .from('drinks')
    .select('category, title, main_alcohol, image_url, id')
    if(error) console.error("Error occured", error.message)
    return {data, error}
}

export async function getRecipe(id)
{
    const {data, error} = await supabase
    .from("drinks")
    .select("*")
    .eq("id", id)
    if(error) console.error("Error occured", error.message)
    return {data, error}
}

export const loadSession = async () => {

    let savedSession;
    try {
        const sessionString = await AsyncStorage.getItem('session');
        if (sessionString) {
            savedSession = JSON.parse(sessionString);
            console.log('Session loaded from AsyncStorage:', savedSession);
        } else {
            console.log('No session found in AsyncStorage');
        }
    } catch (error) {
        console.error('Error loading session:', error);
    }
    return savedSession;
};