import { useContext, useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import CachBytesLB from '../../assets/cachebytes_logo_long_white.svg';
import CacheBytesLW from '../../assets/cachebytes_logo_long_black.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleResize } from '../../hooks/useHandlers';


import './Header.css';
import IDataContext from '../../interfaces/dataContext';
import { dataContext } from '../Layout/Layout';

library.add(faBars, faXmark, faUser);

const Header = () => {

    const context: IDataContext | null = useContext(dataContext);
    
    if(!context){
        return (
            <div className='w-full p-6 flex justify-center items-center border-b-2 border-black'>
                <p className='w-w80 mx-auto text-center text-2xl'>Something went wrong. Could not load the Component</p>
            </div>
        )
    }

    const {dark,isLogIn, setIsModal} = context
    
    const [isClicked, setIsClicked] = useState<boolean>(false);
    
    

    useEffect(() => {
        window.addEventListener('resize', () => handleResize(setIsClicked));

        return () => {
            window.removeEventListener('resize', () => handleResize(setIsClicked));
        }
    })

    return (
        <header>
            <div className='header_container'>
                <div className="logo_section">
                    <div className='hamburger'>
                        <FontAwesomeIcon onClick={() => setIsClicked(!isClicked)} icon={isClicked ? faXmark: faBars} />
                    </div>
                    <div className='logo'>
                        <img src={dark ? CacheBytesLW: CachBytesLB} />
                    </div>
                </div>
                <nav></nav>
                <div className='profile_section'>
                    <div className={isLogIn ? 'hidden': ''}>
                        <button onClick={() => setIsModal(true)}>Get Started</button>
                    </div>
                    <div className={` text-2xl flex items-center gap-3  ${isLogIn ? '': 'hidden'}`}>
                        <FontAwesomeIcon icon={faUser} />
                        <p className="max-sm:hidden">Username</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;