import {createContext, useEffect, useState, ReactNode} from "react";

interface ResultsProviderProps {
    children: ReactNode;
}
interface ResultsItem {
    time: number;
    svg: string;
    symbol: string;
    icon: string;
    codeSample: string;
}
type TypeResultsContext = {
    results: ResultsItem[],
    setResults: (results: (prevState: any) => any[]) => void; // remove this any
    deleteItemFromStorage: (index: number) => void;
}

export const ResultsContext = createContext<TypeResultsContext>({
    setResults(results: ResultsItem[]): void {},
    deleteItemFromStorage(index: number): void {},
    results: []
} as unknown as TypeResultsContext);

export function ResultsProvider({children}: ResultsProviderProps) {
    const [results, setResults] = useState<ResultsItem[]>([]);

    useEffect(() => {
        const storedResults = localStorage.getItem('svg-to-symbol-converter');

        if (storedResults)
            return setResults(JSON.parse(storedResults));

        localStorage.setItem('svg-to-symbol-converter', JSON.stringify([]));
        setResults([]);
    }, []);

    function deleteItemFromStorage(index: number) {
        const newResults = [...results];
        newResults.splice(index, 1);
        setResults(newResults);
        localStorage.setItem('svg-to-symbol-converter', JSON.stringify(newResults));
    }

    return (
        <ResultsContext.Provider value={{results, setResults, deleteItemFromStorage}}>
            {children}
        </ResultsContext.Provider>
    );
}
