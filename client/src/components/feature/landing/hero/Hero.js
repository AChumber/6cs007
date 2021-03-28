//Component for hero section of landing page
import './hero.css';
import React from 'react';
import HeroImage from '../../../../assets/images/hero-image.jpg';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../context/UserContext';


const Hero = () => {
    const [user] = React.useContext(UserContext);
    const isLoggedIn = (
        <>
            <h2>Welcome {user.firstName}</h2>
            <p>Share what you learn and comment on those blogs you enjoy!</p>
        </>
    );
    const LoggedInBtn = <Link to="/my-posts">My Posts</Link>

    return(
        <div className="hero-wrapper">
            <div className="img-wrapper">
                <img src={ HeroImage } className="hero-image" alt="An open book to show the knowledge available"/>
            </div>
            <div className="hero-text-wrapper">
                <div className="left-text">
                    { user.isLoggedIn ?
                        isLoggedIn : 
                        (<>
                            <h1>Share what you learn!</h1>
                            <p>Login to post your own or comment on those blogs you enjoy!</p>
                        </>)
                    }
                </div>
                <div className="right-buttons">
                    <Link to="/create-post">Create my Blog</Link>
                    { isLoggedIn ?  LoggedInBtn : <Link to="/create-account">Create Account</Link>}
                </div>
            </div>
        </div>
    );
}

export default Hero;