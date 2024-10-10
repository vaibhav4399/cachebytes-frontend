import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion'
import IDataContext from '../../interfaces/dataContext';
import './AuthModal.css';
import { dataContext } from '../Layout/Layout';
import Login from '../Login/Login';
import Register from '../Register/Register';

library.add(faXmark);

const AuthModal = () => {

    const context: IDataContext | null = useContext(dataContext);

    if(!context){
        return (
            <div>
                <div>
                    <p>Somethig went wrong while loading the component.</p>
                </div>
            </div>
        );
    }

    const {setUserID, isLogIn, setIsLogIn, isModal, setIsModal} = context;

    const [close, setClose]  = useState<boolean>(false);
    const [loginView, setLoginView] = useState<boolean>(false)

    return (
        <div className={`modal_bg ${isLogIn? 'hidden': isModal ? 'flex': 'hidden'}`}>
            <div className='modal'>
                <FontAwesomeIcon className={`hidden sm:block absolute cursor-pointer text-2xl top-4 ${loginView ? 'left-4' : 'right-4'}`} onClick={() => setIsModal(false)} icon={faXmark} />
                <div className='forms'>
                    {
                        loginView ?
                        <Login loginView={loginView} />
                        :<Register loginView={loginView} />
                    }
                </div>
                <AnimatePresence>
                    <motion.div
                        variants={{
                            hidden: { left: 0 },
                            visible: { left: loginView ? "50%" : 0 }
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            duration: 0.8, ease: "easeInOut"
                        }}
                        style={{
                            top: 0,
                            bottom: 0,
                        }}
                        key={"Desktop"}
                        className={`side-panel hidden ${loginView ? 'rounded-l-3xl' : 'rounded-r-3xl'}`}>

                        <div
                            className={` auth-section ${loginView ? "flex" : "hidden"}`}>
                            <h2>Hey there New Here !!</h2>
                            <p>Create an account first if you dont have one.</p>
                            <button onClick={() => setLoginView(false)}> Register </button>
                        </div>
                        <div className={` auth-section ${loginView ? "hidden" : "flex"}`}>
                            <h2>Already have an account !!</h2>
                            <p>Come on log into your account. Its waiting  for you !!.</p>
                            <button onClick={() => setLoginView(true)}> Login </button>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { y: 0 },
                            visible: { y: loginView ? "100%" : 0 }
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            duration: 0.8, ease: "easeInOut"
                        }}
                        style={{
                            top: 0,
                            bottom: 0,
                        }}
                        key={"Mobile"}
                        className={`side-panel-mobile flex sm:hidden relative rounded-xl`}>
                        <FontAwesomeIcon className={`absolute cursor-pointer text-white text-2xl top-4 right-4`} onClick={() => setIsModal(false)} icon={faXmark} />
                        <div
                            className={` auth-section ${loginView ? "flex" : "hidden"}`}>
                            <h2>Hey there New Here !!</h2>
                            <p>Create an account first if you dont have one.</p>
                            <button onClick={() => setLoginView(false)}> Register </button>
                        </div>
                        <div className={` auth-section ${loginView ? "hidden" : "flex"}`}>
                            <h2>Already have an account !!</h2>
                            <p>Come on log into your account. Its waiting  for you !!.</p>
                            <button onClick={() => setLoginView(true)}> Login </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default AuthModal;