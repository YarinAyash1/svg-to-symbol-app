import {useEffect} from "react";
import axios from "axios";
import {
    Route, Routes,
} from "react-router-dom";
import SvgConvertor from "./layout/SvgConvertor";
import SymbolConvertor from "./layout/SymbolConvertor";
import AppLayout from "./layout/AppLayout";


function App() {
    useEffect(() => {
        axios.get(`${import.meta.env['VITE_API_URL']}/keep-alive`)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route index element={<SvgConvertor/>}/>
                <Route path="/symbol-to-svg" element={<SymbolConvertor/>}/>
            </Route>
        </Routes>
    )
}

export default App
