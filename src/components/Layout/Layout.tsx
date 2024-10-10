import { Outlet } from "react-router-dom"
import { createContext, useState, useEffect } from "react"
import { ToastContainer, Bounce } from "react-toastify";
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import AuthModal from "../AuthModal/AuthModal";
import IDataContext from "../../interfaces/dataContext"
import checkSession from "../../utils/checkUserSession";

import "./Layout.css"
import 'react-toastify/ReactToastify.min.css'

export const dataContext = createContext<IDataContext|null>(null)

const Layout = () => {

    const [userID, setUserID] = useState<string>(localStorage.getItem('uid')?? "");
    const [isLogIn, setIsLogIn] = useState<boolean>(() => {
        return localStorage.getItem('ILI') === 'true'
    });
    const [accTok, setAccTok] = useState<string>(localStorage.getItem('a_k') ?? "");
    const [isModal, setIsModal] = useState<boolean>(false);
    const [dark, setDark] = useState(false);

    const data: IDataContext = {
        userID,
        setUserID,
        isLogIn,
        accTok,
        setAccTok,
        setIsLogIn,
        isModal,
        setIsModal,
        dark,
        setDark
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const url = BACKEND_URL + '/api/auth/checkUser';

    

    useEffect(() => {
        
        if(userID == "" && accTok=="" && !isLogIn){
            checkSession(url, setUserID, setIsLogIn);
        }

    },[])

    useEffect(() => {
        dark ? document.body.classList.add("dark"): document.body.classList.remove("dark");
    },[dark])

    return (
        <dataContext.Provider value={data} >
            <div>
                <Header />
                <AuthModal />
                <main>
                    <ToastContainer
                        newestOnTop={true}
                        theme="colored"
                        pauseOnHover
                        transition={Bounce}
                        draggable
                    />
                    <Outlet />
                </main>
                <Footer />
            </div>
        </dataContext.Provider>
    )
}

export default Layout;