import axios from "axios";
import IDataContext from "../interfaces/dataContext"
import { toast } from "react-toastify";

type authProps = {
    username: string,
    password: string,
    email?: string,
    context: IDataContext
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const loginAuth = async ({username, password, context}: authProps) => {

    const {setUserID, setIsLogIn, setIsModal, setAccTok} = context;

    const url = BACKEND_URL + '/api/auth/login';

    const data = {
        username: username,
        password: password
    }

    try{
        const response = await axios.post(url, data, {
            withCredentials: true
        })
        
        localStorage.setItem("uid", response.data.userID);
        localStorage.setItem("ILI",  'true');
        localStorage.setItem("a_k", response.data.accessToken);
        setUserID(response.data.userID);
        setIsLogIn(true);
        setIsModal(false);
        setAccTok(response.data.accessToken);


    }
    catch(error){
        if (axios.isAxiosError(error)) {
            // Handle Axios error
            toast.error(error.response?.data.message)
        }
    }

    
}



export const registerAuth = async ({username, email, password, context}: authProps) => {

    const { setUserID, setIsLogIn, setIsModal, setAccTok } = context;

    const url = BACKEND_URL + '/api/auth/register';

    const data = {
        username: username,
        email: email,
        password: password
    }

    try {
        const response = await axios.post(url, data, {
            withCredentials: true
        })

        localStorage.setItem("uid", response.data.userID);
        localStorage.setItem("ILI", 'true');
        localStorage.setItem("a_k", response.data.accessToken);
        setUserID(response.data.userID);
        setIsLogIn(true);
        setIsModal(false);
        setAccTok(response.data.accessToken);


    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios error
            toast.error(error.response?.data.message)
        }
    }

}