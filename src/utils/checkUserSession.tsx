import { setState } from "../interfaces/dataContext";
import axios from "axios";

const checkSession = async (url: string, setUserID: setState<string>, setIsLogIn: setState<boolean>) => {
    try {
        const response = await axios.get(url, {
            withCredentials: true
        })

        if (response.data) {
            setUserID(response.data.userID);
            setIsLogIn(true);
            localStorage.setItem('uid', response.data.userID);
            localStorage.setItem('ILI', "true");
        }
    }
    catch (error) {
        console.log(error?.toString());
    }
}

export default checkSession;