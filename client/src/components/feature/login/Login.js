//Parent For Login Section
import LoginForm from './auth/LoginForm';
import CreateAccount from './create/CreateAccount';
import './login.css';
import { useState, useEffect } from 'react'; 

const Login = ({ isLoggingIn }) => {
    const [isLogin, setIsLogin] = useState(true);

    //Check is prop passed is false (So show CreateAccount component instead). only once component mounts
    useEffect(() => {
        !isLoggingIn && setIsLogin(false); 
    }, [])

    const handleChange = () => {
        setIsLogin(!isLogin);
    }

    return(
        <div className="form-wrapper">
            <div className="form-image"></div>
            {isLogin ? <LoginForm changePage={ handleChange }/> : <CreateAccount changePage={ handleChange }/> }
        </div>
    );
}

export default Login;