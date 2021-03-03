//Component for hero section of landing page
import './hero.css';
import HeroImage from '../../../../assets/images/hero-image.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
    return(
        <div className="hero-wrapper">
            <div className="img-wrapper">
                <img src={ HeroImage } className="hero-image" alt="Image of a open book to show the knowledge available"/>
            </div>
            <div className="hero-text-wrapper">
                <div className="left-text">
                    <h1>Share what you learn!</h1>
                    <p>Login to post your own or comment on those blogs you enjoy!</p>
                </div>
                <div className="right-buttons">
                    <Link to="/create-post">Create my Blog</Link>
                    <Link to="/create-account">Create Account</Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;