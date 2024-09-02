import { createContext, useState } from "react";

export const DrinkContext = createContext({
    drinks: [],
    favDrinks: [],
    fetchDrinksList: () => {},
    fetchFavoritesDrinks: () => {},
    addFavDrink: () => {},
    removeFavDrink: () => {}
});

function DrinkContextProvider({children}) {
    const [drinks, setDrinks] = useState([]);
    const [favDrinks, setFavDrinks] = useState([])

    function fetchDrinksList(drinks) {
        // console.log("fetch z context");
        setDrinks(drinks);
    }

    function fetchFavoritesDrinks(favDrinks)
    {
        setFavDrinks(favDrinks)
    }

    function addFavDrink(favDrink)
    {
        setFavDrinks((prev)=>
        {
            return [...prev, favDrink]
        })
    }

    function removeFavDrink(toRemovedId)
    {
        const filteredItems = favDrinks.filter((favDrink)=>
        {
             return favDrink.id !== toRemovedId
        })
        setFavDrinks(filteredItems)
    }

    const value = {
        drinks: drinks,
        favDrinks: favDrinks,
        fetchDrinksList: fetchDrinksList,
        fetchFavoritesDrinks: fetchFavoritesDrinks,
        addFavDrink: addFavDrink,
        removeFavDrink: removeFavDrink
    };

    return (
        <DrinkContext.Provider value={value}>
            {children}
        </DrinkContext.Provider>
    );
}

export default DrinkContextProvider;
