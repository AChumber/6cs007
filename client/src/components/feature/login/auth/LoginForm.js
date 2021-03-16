//child class for login section. Handles the login
import { useState, useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';

const LoginForm = ({ changePage, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmptyEmail, setIsEmptyEmail] = useState(false);
    const [isEmptyPassword, setIsEmptyPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isShowSuccess, setIsShowSuccess] = useState(false);
    const [user, setUser] = useContext(UserContext); //Get context to set user
    const errorBorderStyle = { border: "1px solid red" };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        //Ensure Validation
        if(!email || !password){
            !email ? setIsEmptyEmail(true) : (!password && setIsEmptyPassword(true));
        }
        //Set options for api call
        const authOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
            })
        };
        const response = await fetch('/api/auth', authOptions);
        const jsonRes = await response.json();
        if(response.status === 400){
            setErrorMessage(jsonRes.msg);
        } else if(response.status === 200) {
            setIsShowSuccess(true);
             //Reset form state
            setEmail('');
            setPassword('');

            //Redirect user to home page after storing JWT and user credentials to Global Context API
            //Set context
            setUser(prevState => ({
                ...prevState,
                isLoggedIn: true,
                token: jsonRes.accessToken,
                email: jsonRes.user.email,
                firstName: jsonRes.user.firstName,
                surname: jsonRes.user.surname,
                _id: jsonRes.user._id
            }));
            history.push('/');
        }
    }

    //Method to ensure form validation is shown to the user
    const handleBlur = (e) => {
        if(e.target.name === 'email'){
            (!email) ? setIsEmptyEmail(true) : setIsEmptyEmail(false);
        } else if (e.target.name === 'password') {
            (!password) ? setIsEmptyPassword(true) : setIsEmptyPassword(false);
        } 
    }

    return(
        <form className="right-side" onSubmit={ handleSubmit }>
            <div className="form-container">
                <h4>Hi. Log in to share your experiences!</h4>
                <hr />
                <div className="form-input">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="Enter Email..."
                        value={ email } onChange={ e => setEmail(e.target.value) }
                        onBlur={ handleBlur }
                        style={isEmptyEmail ? errorBorderStyle: null} />
                    { isEmptyEmail && <small className="error-text">Please enter an email</small> }
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Enter Password..."
                        value={ password } onChange={ e => setPassword(e.target.value) }
                        onBlur={ handleBlur }
                        style={isEmptyPassword ? errorBorderStyle: null} />
                    { isEmptyPassword && <small className="error-text">Please enter a Password</small> }
                </div>
                <p>Don't have an Account? <span className="form-span" onClick={ changePage }>Create one here.</span></p>
                <button type="submit">Log In</button>
                {
                    errorMessage && (
                        <div className="error-response">
                            <h5>{ errorMessage }</h5>
                        </div>
                    )
                }
                { isShowSuccess && (
                    <div className="success-modal">
                        <h5>Successfully Logged In!</h5>
                    </div>
                ) }
            </div>
        </form>
    );
};

export default LoginForm;