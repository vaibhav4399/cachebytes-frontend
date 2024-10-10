
export type setState<s> = React.Dispatch<React.SetStateAction<s>>

interface IDataContext {
    userID: string,
    setUserID: setState<string>,
    isLogIn: boolean,
    setIsLogIn: setState<boolean>,
    accTok: string,
    setAccTok: setState<string>,
    isModal: boolean,
    setIsModal: setState<boolean>,
    dark: boolean,
    setDark: setState<boolean>
}


export default IDataContext;