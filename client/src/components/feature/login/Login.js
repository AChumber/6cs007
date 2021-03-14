//Parent For Login Section
import LoginForm from './auth/LoginForm';
import CreateAccount from './create/CreateAccount';
import './login.css';
import Logo from '../../../assets/images/Logo.svg';
import { useState, useEffect } from 'react'; 
import { Link, useHistory } from 'react-router-dom';

const Login = ({ isLoggingIn }) => {
    const [isLogin, setIsLogin] = useState(true);
    const history = useHistory();

    //Check is prop passed is false (So show CreateAccount component instead). only once component mounts
    useEffect(() => {
        !isLoggingIn && setIsLogin(false); 
    }, [])

    const handleChange = () => {
        setIsLogin(!isLogin);
    }

    return(
        <div className="form-wrapper">
            <Link to="/" title="Click to go to Home page"><img src={Logo} alt="Blogs Logo" className="login-logo" /></Link>
            <div className="form-image"></div>
            {isLogin ? <LoginForm changePage={ handleChange } history={ history }/> : <CreateAccount changePage={ handleChange } history={ history }/> }
        </div>
    );
}

export default Login;