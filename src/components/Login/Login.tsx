import { useContext, useRef } from 'react';
import './Login.css';
import IDataContext from '../../interfaces/dataContext';
import { dataContext } from '../Layout/Layout';
import { toast } from 'react-toastify';
import { loginAuth } from '../../utils/authApiCall';

const Login = ({loginView}: {loginView: boolean}) => {

    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const context: IDataContext| null = useContext(dataContext);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const uname = username.current?.value?? '';
        const pass = password.current?.value?? '';

        if(uname.length < 8 || uname.length > 15){
            toast.error("Username should be between 8 and 15 characters");
            return;
        }

        if (pass.length < 8 || pass.length > 15){
            toast.error("Password should be between 8 and 15 characters");
            return;
        }

        if(!context){
            toast.error("Something went wrong");
            return;
        }

        const data = {
            username: uname,
            password: pass,
            context: context
        }

        await loginAuth(data);


    }

    return (
        <div className={` login_section ${loginView ? 'flex': 'hidden'}`}>
            <p className="section_title">Login</p>
            <div className='section_body'>
                <form onSubmit={handleSubmit} className='section_form'>
                    <input ref={username} type="text" name="username" placeholder='Enter the Username' />
                    <input ref={password} type="password" name="password" placeholder='Enter the Password' />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;