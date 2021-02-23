import './navbar.css';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/Logo.svg';

const Navbar = ({ isLoggedIn }) => {
    const widthStyle = {
        width: (isLoggedIn ? 30: 15)+'%'
    }
    const notloggedIn = (
        <>
            <Link to="/login" className="navbar-link">Login</Link>
            <a href="#" className="navbar-link navbar-button">Sign Up</a>
        </>
    );
    const loggedIn = (
        <>
            <a href="#" className="navbar-link">Create new Blog</a>
            <a href="#" className="navbar-link">My Blogs</a>
            <a href="#" className="navbar-link navbar-button">Log Out</a>
        </>
    );
    return(
        <>
        <nav className="navbar">
            <img src={Logo} alt="Blogs Logo" />
            <div className="navbar-link-wrapper" style={widthStyle}>
                { isLoggedIn ? loggedIn : notloggedIn }
            </div>
        </nav>
        <hr />
        </>
    );
}

export default Navbar;