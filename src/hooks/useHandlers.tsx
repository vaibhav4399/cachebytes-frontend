import { setState } from "../interfaces/dataContext";


export const handleResize = (setIsClicked: setState<boolean>) => {
    if (window.innerWidth > 640) {
        setIsClicked(false);
    }
}