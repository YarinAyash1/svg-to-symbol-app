import {createContext, useEffect, useState, ReactNode} from "react";

interface SvgConvertorProviderProps {
    children: ReactNode;
}
export interface ResultsItem {
    time: number;
    svg: string;
    symbol: string;
    icon: string;
    codeSample: string;
}

type TypeSvgConvertorContext = {
    results: ResultsItem[],
    setResults: (results: (prevState: any) => any[]) => void; // remove this any
    deleteItemFromStorage: (index: number) => void;
}

export const SvgConvertorContext = createContext<TypeSvgConvertorContext>({
    setResults(results: ResultsItem[]): void {},
    deleteItemFromStorage(index: number): void {},
    results: []
} as unknown as TypeSvgConvertorContext);

export function SvgConvertorProvider({children}: SvgConvertorProviderProps) {
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
        <SvgConvertorContext.Provider value={{results, setResults, deleteItemFromStorage}}>
            {children}
        </SvgConvertorContext.Provider>
    );
}
