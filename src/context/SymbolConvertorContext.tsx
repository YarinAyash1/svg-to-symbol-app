import {createContext, useEffect, useState, ReactNode} from "react";
import {validateAndFixSvg} from "../helper";

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
    downloadFile: (index: number) => void;
}

export const SymbolConvertorContext = createContext<TypeSymbolConvertorContext>({
    setResults(results: ResultsItem[]): void {},
    deleteItemFromStorage(index: number): void {},
    downloadFile(index: number): void {},
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

    function downloadFile(index : number): void {
        console.log(validateAndFixSvg(results[index].svg))
        const blob = new Blob([validateAndFixSvg(results[index].svg)], { type: 'image/svg+xml' });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'file';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <SymbolConvertorContext.Provider value={{results, setResults, deleteItemFromStorage, downloadFile}}>
            {children}
        </SymbolConvertorContext.Provider>
    );
}
