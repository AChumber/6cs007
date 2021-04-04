import React from 'react';
import { Link } from 'react-router-dom';
import './noMatch.css';

function NoMatch404() {
    return (
        <div className="center-info-container no-match-404">
            <div className="error-404">
                <h2 className="colored">4</h2>
                <h2>0</h2>
                <h2 className="colored">4</h2>
                <div className="underline"></div>
            </div>
            <h1>Sorry, We can't find that page you are looking for</h1>
            <p>Click here <Link to="/">go home</Link> or <Link to="/login">login to your account</Link>!</p>
        </div>
    )
}

export default NoMatch404
