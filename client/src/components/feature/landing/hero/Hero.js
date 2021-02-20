//Component for hero section of landing page
import './hero.css';
import HeroImage from '../../../../assets/images/hero-image.jpg';

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
                    <button>Create my Blog</button>
                    <button>Create Account</button>
                </div>
            </div>
        </div>
    );
}

export default Hero;