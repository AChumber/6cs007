import './footer.css';
import Logo from '../../../assets/images/Logo.svg';
import { Link } from 'react-router-dom';

const Footer = ({ isLoggedIn }) => {
    const signedIn = (
        <>
            <li><Link to="/">Account Settings</Link></li>
            <li><Link to="/create-post">Create a Blog</Link></li>
            <li><Link to="/my-posts">Edit a Blog</Link></li>
        </>
    );
    const notSignedIn = (
        <>
        <li><Link to="/login">Sign in</Link></li>
        <li><Link to="/create-account">Create an Account</Link></li>
        </>
    );
    return(
        <footer>
            <div className="left-links">
                <div className="links">
                    <div className="logo-wrapper">
                        <Link to="/" title="Click to go to Home page">
                            <img src={ Logo } alt="Logo for MyBlogs"/>
                        </Link>
                    </div>
                    <ul className="footer-links">
                        { isLoggedIn ? signedIn : notSignedIn }
                    </ul>
                </div>
                <p><i>Any blogs written do not represent the views of the company. </i></p>
            </div>
        </footer>
    );
};

export default Footer;