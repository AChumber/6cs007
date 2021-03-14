import { useState } from 'react';

const CreateAccount = ({ changePage, history }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPass, setReEnterPass] = useState('');
    const [passwordMatchErr, setPasswordMatchErr] = useState(false);
    const [emptyInputs, setEmptyInputs] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); //Get error from response to server
    const [showSuccess, setShowSuccess] = useState(false);
    const errorBorderStyle = { border: "1px solid red" };

    const handleSubmit = async e => {
        e.preventDefault();
        //Validate for no empty fields
        if(!email || !firstName || !surname){
            setEmptyInputs(true);
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
                email,
                password,
                firstName,
                surname
            })
        };
        const response = await fetch('/api/users', createAccountOptions);
        const jsonRes = await response.json();
        if(response.status === 400){
            setErrorMessage(jsonRes.msg);
        } else if(response.status === 200) {
            setShowSuccess(true);
            setErrorMessage('');
            setFirstName('');
            setSurname('');
            setEmail('');
            setPassword('');
            setReEnterPass('');

            //Redirect user to home page after storing JWT and user credentials to Global Context API
            history.push('/');
        }
    }

    const handleOnBlur = e => {
        //Method to check if passwords match - only if characters in there 
        if(!(reEnterPass.length === 0) && (password !== reEnterPass)){
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
                { emptyInputs && (
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
                            onChange={e => setFirstName(e.target.value)}
                            style={emptyInputs && !firstName ? errorBorderStyle: null}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="surname">Surname:</label>
                        <input type="text" name="surname" placeholder="Enter Surname..."
                            onChange={e => setSurname(e.target.value)}
                            style={emptyInputs && !surname ? errorBorderStyle: null}/>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="Enter Email..."
                        onChange={e => setEmail(e.target.value)}
                        style={emptyInputs && !email ? errorBorderStyle: null}/>
                </div>
                <div className="form-input">
                    <label htmlFor="password">Create Password:</label>
                    <input type="password" name="password" placeholder="Enter Password..."
                        onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-input">
                    <label htmlFor="re-enter-password">Re enter Password:</label>
                    <input type="password" name="re-enter-password" placeholder="Re-enter Password..."
                        onChange={e => setReEnterPass(e.target.value)}
                        onBlur={e => handleOnBlur(e) }
                        style={passwordMatchErr ? errorBorderStyle: null} />
                    { passwordMatchErr && <small className="error-text">Password's Must Match</small> }
                </div>
                <p>Already have an Account? <span className="form-span" onClick={ changePage }>Log In here.</span></p>
                <button type="submit" className="create-account-btn">Create my Account</button>
            </div>
        </form>
    );
};

export default CreateAccount;