import { createContext, useState } from "react";

export const DrinkContext = createContext({
    drinks: [],
    fetchDrinksList: () => {}
});

function DrinkContextProvider({children}) {
    const [drinks, setDrinks] = useState([]);

    function fetchDrinksList(drinks) {
        // console.log("fetch z context");
        setDrinks(drinks);
    }

    const value = {
        drinks: drinks,
        fetchDrinksList: fetchDrinksList
    };

    return (
        <DrinkContext.Provider value={value}>
            {children}
        </DrinkContext.Provider>
    );
}

export default DrinkContextProvider;
