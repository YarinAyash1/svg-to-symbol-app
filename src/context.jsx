import {createContext, useEffect, useState} from "react";

export const ResultsContext = createContext({});

export function ResultsProvider({children}) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const storedResults = localStorage.getItem('svg-to-symbol-converter');

        if (storedResults)
            return setResults(JSON.parse(storedResults));

        localStorage.setItem('svg-to-symbol-converter', JSON.stringify([]));
        setResults([]);
    }, []);

    function deleteItemFromStorage(index) {
        const newResults = [...results];
        newResults.splice(index, 1);
        console.log(newResults)
        setResults(newResults);
        localStorage.setItem('svg-to-symbol-converter', JSON.stringify(newResults));
    }

    return (
        <ResultsContext.Provider value={{results, setResults, deleteItemFromStorage}}>
            {children}
        </ResultsContext.Provider>
    );
}
