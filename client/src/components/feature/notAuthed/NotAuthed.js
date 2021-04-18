//Modal pop-up to show the user they are not logged in and must be logged in to view content
import React from 'react';
import { Link } from 'react-router-dom';
import './notAuthed.css';
import undraw_login_notauthed from '../../../assets/images/undraw_login_notauthed.svg';

function NotAuthed() {
    return (
        <div className="center-info-container">
            <img src={ undraw_login_notauthed } 
                alt="You are not authed. Login or create an account" 
                className="not-authed-image" />
            <h1>Sorry, But you need to log in to continue</h1>
            <p>Click here <Link to="/login">Log in to your account</Link> or <Link to="/create-account">Create an account here</Link>!</p>
        </div>
    )
}

export default React.memo(NotAuthed);    
