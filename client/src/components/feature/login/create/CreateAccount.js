import { useState, useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { errorBorderStyle, errorTextColor } from '../../../shared/ErrorStyles';
import Spinner from '../../../shared/spinner/Spinner';

const CreateAccount = ({ changePage, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        surname: '',
        password: '',
        reEnterPass: ''
    });
    const [emptyInputs, setEmptyInputs] = useState({
        email: false,
        firstName: false,
        surname: false,
        password: false
    });
    const [passwordMatchErr, setPasswordMatchErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); //Get error from response to server
    const [showSuccess, setShowSuccess] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [, setUser] = useContext(UserContext); //Get context to set user

    const handleSubmit = async e => {
        setShowSpinner(true);
        e.preventDefault();
        //Validate for no empty fields
        if(!formData.email || !formData.firstName || !formData.surname){
            setEmptyInputs({
                email: !formData.email,
                firstName: !formData.firstName,
                surname: !formData.surname,
                password: !formData.password
            });
            setShowSpinner(false);
            return null;
        }
        setEmptyInputs(false);
        //Ensure passwords match
        if(passwordMatchErr) return null; 
        
        //Set POST request options
        const createAccountOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                surname: formData.surname
            })
        };
        const response = await fetch('/api/users', createAccountOptions);
        const jsonRes = await response.json();
        if(response.status === 400){
            setErrorMessage(jsonRes.msg);
            setShowSpinner(false);
        } else if(response.status === 200) {
            setShowSuccess(true);
            setFormData({
                email: '',
                firstName: '',
                surname: '',
                password: '',
                reEnterPass: ''
            });
            setEmptyInputs({
                email: false,
                firstName: false,
                surname: false,
                password: false
            })

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
            setShowSpinner(false);
            history.push('/');
        }
    }

    //Method to change value in state
    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //Method to ensure the field the user is focused on has information
    const handleBlur = e => {
        var isEmpty = e.target.value === '' ? true : false;
        setEmptyInputs(prevState => ({
            ...prevState,
            [e.target.name]: isEmpty
        }));
    }

    //Method to check if passwords match - only if characters in there 
    const handleBlurPasswordCheck = e => {
        if(!(formData.reEnterPass.length === 0) && (formData.password !== 
            formData.reEnterPass)){
            setPasswordMatchErr(true);
        } else {
            setPasswordMatchErr(false);
        }
    }

    return(
        <form className="right-side" onSubmit={ handleSubmit }>
            <div className="form-container">
                <h4>Let's get you set up with an Account!</h4>
                <hr />
                { (emptyInputs.email || emptyInputs.firstName || emptyInputs.surname || emptyInputs.password) && (
                    <div className="empty-inputs">
                        <h5>Please enter information in all fields</h5>
                    </div>
                ) }
                {
                    errorMessage && (
                        <div className="error-response">
                            <h5>{ errorMessage }</h5>
                        </div>
                    )
                }
                {showSuccess && (
                    <div className="success-modal">
                        <h5>Account has been created!</h5>
                    </div>
                )}
                <div className="form-input-2-items">
                    <div className="form-input">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" name="firstName" placeholder="Enter First Name..."
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            style={(emptyInputs.firstName && !formData.firstName) ? errorBorderStyle: null}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="surname">Surname:</label>
                        <input type="text" name="surname" placeholder="Enter Surname..."
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            style={(emptyInputs.surname && !formData.surname) ? errorBorderStyle: null}/>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="Enter Email..."
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        style={emptyInputs.email && !formData.email ? errorBorderStyle: null}/>
                </div>
                <div className="form-input">
                    <label htmlFor="password">Create Password:</label>
                    <input type="password" name="password" placeholder="Enter Password..."
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                        style={emptyInputs.password && !formData.password ? errorBorderStyle: null}/>
                </div>
                <div className="form-input">
                    <label htmlFor="re-enter-password">Re enter Password:</label>
                    <input type="password" name="reEnterPass" placeholder="Re-enter Password..."
                        onChange={ handleChange }
                        onBlur={e => handleBlurPasswordCheck(e) }
                        style={passwordMatchErr ? errorBorderStyle: null} />
                    { passwordMatchErr && <small style={errorTextColor}>Password's Must Match</small> }
                </div>
                <p>Already have an Account? <span className="form-span" onClick={ changePage }>Log In here.</span></p>
                <button type="submit" className="create-account-btn">
                    {showSpinner ? <Spinner /> : 'Create my Account'}
                </button>
            </div>
        </form>
    );
};

export default CreateAccount;