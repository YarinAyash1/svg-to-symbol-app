import {createContext, useEffect, useState, ReactNode} from "react";

interface SymbolConvertorProviderProps {
    children: ReactNode;
}
export interface ResultsItem {
    time: number;
    svg: string;
    symbol: string;
    icon: string;
    codeSample: string;
}

type TypeSymbolConvertorContext = {
    results: ResultsItem[],
    setResults: (results: (prevState: any) => any[]) => void; // remove this any
    deleteItemFromStorage: (index: number) => void;
}

export const SymbolConvertorContext = createContext<TypeSymbolConvertorContext>({
    setResults(results: ResultsItem[]): void {},
    deleteItemFromStorage(index: number): void {},
    results: []
} as unknown as TypeSymbolConvertorContext);

export function SymbolConvertorProvider({children}: SymbolConvertorProviderProps) {
    const [results, setResults] = useState<ResultsItem[]>([]);

    useEffect(() => {
        const storedResults = localStorage.getItem('symbol-to-svg-converter');

        if (storedResults)
            return setResults(JSON.parse(storedResults));

        localStorage.setItem('symbol-to-svg-converter', JSON.stringify([]));
        setResults([]);
    }, []);

    function deleteItemFromStorage(index: number) {
        const newResults = [...results];
        newResults.splice(index, 1);
        setResults(newResults);
        localStorage.setItem('symbol-to-svg-converter', JSON.stringify(newResults));
    }

    return (
        <SymbolConvertorContext.Provider value={{results, setResults, deleteItemFromStorage}}>
            {children}
        </SymbolConvertorContext.Provider>
    );
}
