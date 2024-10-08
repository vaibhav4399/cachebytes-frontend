import { Outlet } from "react-router-dom"
import { createContext, useState, useEffect } from "react"
import { ToastContainer, Bounce } from "react-toastify";
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
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
    const [dark, setDark] = useState(false);

    const data: IDataContext = {
        userID,
        setUserID,
        isLogIn,
        setIsLogIn,
        dark,
        setDark
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const url = BACKEND_URL + '/api/auth/checkUser';

    

    useEffect(() => {
        
        if(userID == "" && !isLogIn){
            checkSession(url, setUserID, setIsLogIn);
        }

    },[])

    return (
        <dataContext.Provider value={data} >
            <div>
                <Header />
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