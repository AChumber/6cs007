//Parent For Login Section
import LoginForm from './auth/LoginForm';
import CreateAccount from './create/CreateAccount';
import FormImage from '../../../assets/images/form-image.jpg';
import './login.css';
import Logo from '../../../assets/images/Logo.svg';
import { useState } from 'react'; 
import { Link, useHistory } from 'react-router-dom';

const Login = ({ isLoggingIn }) => {
    const [isLogin, setIsLogin] = useState(isLoggingIn);
    const history = useHistory();

    const handleChange = () => {
        setIsLogin(!isLogin);
    }

    return(
        <div className="form-wrapper">
            <Link to="/" title="Click to go to Home page"><img src={Logo} alt="Blogs Logo" className="login-logo" /></Link>
            <div className="form-image-container">
                <img src={ FormImage } className="form-image" rel="preload" 
                        loading="lazy"
                        alt="Bookshelf filled with books"/>
            </div>
            {isLogin ? <LoginForm changePage={ handleChange } history={ history }/> : <CreateAccount changePage={ handleChange } history={ history }/> }
        </div>
    );
}

export default Login;