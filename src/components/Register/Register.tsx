import { useContext, useRef } from 'react';
import './Register.css';
import { dataContext } from '../Layout/Layout';
import IDataContext from '../../interfaces/dataContext';
import { toast } from 'react-toastify';
import { registerAuth } from '../../utils/authApiCall';


const Register = ({loginView} : {loginView: boolean}) => {
    const username = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const context: IDataContext | null = useContext(dataContext);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const uname = username.current?.value?? '';
        const em = email.current?.value?? '';
        const pass = password.current?.value?? '';

        if(uname.length < 8 || uname.length > 15){
            toast.error("Username should be between 8 and 15 characters");
            return;
        }

        if(em.length < 1){
            toast.error("Please enter a valid email");
            return;
        }

        if(pass.length < 8 || pass.length > 15){
            toast.error("Password should be between 8 and 15 characters");
            return;
        }

        if(!context){
            toast.error("Something went wrong");
            return;
        }

        const data = {
            username: uname,
            email: em,
            password: pass,
            context: context
        }


        registerAuth(data);
    }

    return (
        <div className={` register_section ${loginView ? 'hidden' : 'flex'}`}>
            <p className="section_title">Register</p>
            <div className='section_body'>
                <form onSubmit={handleSubmit} className='section_form'>
                    <input ref={username} type="text" name="username" placeholder='Enter the Username' />
                    <input ref={email} type="email" name="email" placeholder='Enter the Email' />
                    <input ref={password} type="password" name="password" placeholder='Enter the Password' />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}


export default Register;