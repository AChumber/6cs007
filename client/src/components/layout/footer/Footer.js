import './footer.css';
import Logo from '../../../assets/images/Logo.svg';

const Footer = ({ isLoggedIn }) => {
    const signedIn = (
        <>
            <li><a href="#">Account Settings</a></li>
            <li><a href="#">Create a Blog</a></li>
            <li><a href="#">Edit a Blog</a></li>
        </>
    );
    const notSignedIn = (
        <>
        <li><a href="#">Sign in</a></li>
        <li><a href="#">Create an Account</a></li>
        </>
    );
    return(
        <footer>
            <div className="left-links">
                <div className="links">
                    <div className="logo-wrapper">
                        <img src={ Logo } alt="Logo for MyBlogs"/>
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