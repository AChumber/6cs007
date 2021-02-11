//Parent For Login Section
import LoginForm from './auth/LoginForm';
import CreateAccount from './create/CreateAccount';
import './login.css';
import formImage from '../../../assets/images/form-image.jpg';
import { useState } from 'react'; 

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

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