import HeaderNavbar from "../components/HeaderNavbar";
import {Outlet} from "react-router-dom";
import GithubLink from "../components/GithubLink";
import {ResultsProvider} from "../context";

function AppLayout() {
    return (
        <>
            <HeaderNavbar/>
            <Outlet/>
            <GithubLink/>
        </>
    )
}

export default AppLayout;
