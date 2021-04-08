import './navbar.css';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Logo from '../../../assets/images/Logo.svg';
import { UserContext } from '../../../context/UserContext';

const Navbar = ({ isLoggedIn }) => {
    const [showLinks, setShowLinks] = useState(false);
    const [, setUser] = useContext(UserContext); 
    
    const handleLogOut = () => {
        setShowLinks(!showLinks);
        //Remove user
        setUser({
            isLoggedIn: false
        });
    }

    //Will close navbar (when expanded) when user clicks on link
    const handleClick = () => {
        setShowLinks(!showLinks);
    }

    const widthStyle = {
        width: (isLoggedIn ? 40: 30)+'%'
    }
    const notloggedIn = (
        <>
            <Link onClick={handleClick} to="/posts" className="navbar-link">Search posts</Link>
            <Link onClick={handleClick} to="/login" className="navbar-link">Login</Link>
            <Link onClick={handleClick} to="/create-account" className="navbar-link navbar-button">Sign Up</Link>
        </>
    );
    const loggedIn = (
        <>
            <Link onClick={handleClick} to={{ pathname: "/create-post", state: { prevPath: 'navbar' }}} className="navbar-link">Create new Blog</Link>
            <Link onClick={handleClick} to="/my-posts" className="navbar-link">My Blogs</Link>
            <Link to="/" className="navbar-link navbar-button" onClick={ handleLogOut }>Log Out</Link>
        </>
    );
    return(
        <>
        <nav className="navbar">
            <Link onClick={handleClick} to="/" title="Click to go to Home page">
                <img className="logo-image" src={Logo} alt="Blogs Logo" />
            </Link>
            <div className="drop-down-btn" onClick={ () => setShowLinks(!showLinks) }>
                <div className={ showLinks ? "toggle" : "" } id="line1"></div>
                <div className={ showLinks ? "toggle" : "" } id="line2"></div>
                <div className={ showLinks ? "toggle" : "" } id="line3"></div>
            </div>
            <div className={showLinks ? "navbar-link-wrapper show" : "navbar-link-wrapper"} style={widthStyle}>
                { isLoggedIn ? loggedIn : notloggedIn }
            </div>
        </nav>
        <hr />
        </>
    );
}

export default Navbar;