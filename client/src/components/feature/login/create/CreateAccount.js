const CreateAccount = ({ changePage }) => {
    return(
        <form className="right-side">
            <div className="container">
                <h4>Let's get you set up with an Account!</h4>
                <hr />
                <div className="form-input">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="Enter Email..."/>
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Enter Password..."/>
                </div>
                <p>Already have an Account? <span className="form-span" onClick={ changePage }>Log In here.</span></p>
                <button>Create my Account</button>
            </div>
        </form>
    );
};

export default CreateAccount;