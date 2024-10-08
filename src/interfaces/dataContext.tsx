
export type setState<s> = React.Dispatch<React.SetStateAction<s>>

interface IDataContext {
    userID: string,
    setUserID: setState<string>,
    isLogIn: boolean,
    setIsLogIn: setState<boolean>,
    dark: boolean,
    setDark: setState<boolean>
}


export default IDataContext;