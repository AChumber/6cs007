//child class for login section. Handles the login
import { useState } from 'react';

const LoginForm = ({ changePage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        //Reset form state
        setEmail('');
        setPassword('');

    }

    return(
        <form className="right-side">
            <div className="container">
                <h4>Hi. Log in to share your experiences!</h4>
                <hr />
                <div className="form-input">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="Enter Email..."
                        value={ email } onChange={ e => setEmail(e.target.value) }/>
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Enter Password..."
                        value={ password } onChange={ e => setPassword(e.target.value) }/>
                </div>
                <p>Don't have an Account? <span className="form-span" onClick={ changePage }>Create one here.</span></p>
                <button>Log In</button>
            </div>
        </form>
    );
};

export default LoginForm;