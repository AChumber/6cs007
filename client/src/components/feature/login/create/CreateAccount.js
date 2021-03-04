import { useState } from 'react';

const CreateAccount = ({ changePage }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPass, setReEnterPass] = useState('');

    return(
        <form className="right-side">
            <div className="form-container">
                <h4>Let's get you set up with an Account!</h4>
                <hr />
                <div className="form-input-2-items">
                    <div className="form-input">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" name="firstName" placeholder="Enter First Name..."
                            onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="surname">Surname:</label>
                        <input type="text" name="surname" placeholder="Enter Surname..."
                            onChange={e => setSurname(e.target.value)}/>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="Enter Email..."
                        onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form-input">
                    <label htmlFor="password">Create Password:</label>
                    <input type="password" name="password" placeholder="Enter Password..."
                        onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-input">
                    <label htmlFor="re-enter-password">Re enter Password:</label>
                    <input type="password" name="re-enter-password" placeholder="Re-enter Password..."
                        onChange={e => setReEnterPass(e.target.value)}/>
                </div>
                <p>Already have an Account? <span className="form-span" onClick={ changePage }>Log In here.</span></p>
                <button>Create my Account</button>
            </div>
        </form>
    );
};

export default CreateAccount;