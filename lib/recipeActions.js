import supabase from "./supabaseClient";

export async function getRecipes()
{
    const {data, error} = await supabase
    .from('drinks')
    .select('*')
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