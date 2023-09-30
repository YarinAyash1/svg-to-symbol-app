import {createBrowserRouter} from "react-router-dom";
import SvgConvertor from "../layout/SvgConvertor";
import SymbolConvertor from "../layout/SymbolConvertor";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SvgConvertor/>,
    },
    {
        path: "/symbol-to-svg",
        element: <SymbolConvertor/>,
    },
]);

export default router;
