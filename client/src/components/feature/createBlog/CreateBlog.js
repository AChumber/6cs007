import { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom'; 
import { UserContext } from '../../../context/UserContext';
import { errorBorderStyle, errorTextColor } from '../../shared/ErrorStyles';
import Spinner from '../../shared/spinner/Spinner';
import './createBlog.css';

//Form component to create a new blog
const CreateBlog = () => {
    const [formInputs, setFormInputs] = useState({
        title: '',
        description: '',
        body: '',
        imageFile: ''
    });
    const [emptyField, setEmptyField] = useState({
        title: false,
        description: false,
        body: false
    });
    const [modals, setModals] = useState({
        emptyFieldsModal: false,
        successModal: false
    });
    const [errMessage, setErrMessage] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [user] = useContext(UserContext);

    //Upload image to cloudify
    const handleImageUpload = async () => {
        var imageUrl = '';
        //Check if file has been uploaded then upload
        if(formInputs.imageFile){
            const cloudName = "dzttizwyd";
            let formData = new FormData();
            formData.append("file", formInputs.imageFile);
            formData.append("upload_preset", "leyyka54")
            await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    imageUrl = data.url;
                })
                .catch(err => console.log(err.message));
        }
        return imageUrl;
    }

    const handleSubmit = async (e) => {
        setShowSpinner(true);
        e.preventDefault();
        //Validate if fields are empty or not
        if(!formInputs.title || !formInputs.body || !formInputs.description) {
            setModals(prevState => ({ ...prevState, emptyFieldsModal: !prevState.emptyFieldsModal }));
            return null;
        } 

        //Upload image file to cloudify and return url to image
        const imagePath = await handleImageUpload();
        //save a path that applies image compression when retrieving 
        let imgUrl = imagePath.split('/');
        imgUrl.splice(6,0,'q_70');
        imgUrl.join('/');

        //Fetch - replace newline carriages with <br/> in body
        const submitOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': user.token
            },
            body: JSON.stringify({
                authorEmail: user.email,
                authorName: `${user.firstName} ${user.surname}`,
                postTitle: formInputs.title,
                postDesc: formInputs.description.replace(/\r\n/g, '<br />'),
                postBody: formInputs.body,
                postImgUrl: imgUrl
            })
        }
        const response = await fetch('api/blogpost/', submitOptions);
        if(!response.ok){
            console.log('Response Recieved not ok');
        }
        const jsonRes = await response.json();
        if(response.status === 200){
            setShowSpinner(false);
            setModals(prevState => ({ ...prevState, successModal: !prevState.successModal, emptyFieldsModal: false }));
            setTimeout(()=>{
                setIsRedirect(true);
            }, 2000)
        } else{ 
            setShowSpinner(false);
            setErrMessage(jsonRes.msg);
        }
    }

    //Change state for field when user types
    const handleChange = (e) => {
        setFormInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    //Check if user leaves focus of an input without entering a value
    const handleOnBlur = (e) => {
        setEmptyField(prevState => ({
            ...prevState,
            [e.target.name]: !e.target.value
        }));
    }

    return(
        <section className="content-section">
            {isRedirect && <Redirect to='/my-posts'/>}
            <div className="header">
                <h1>Create a new Blog</h1>
                <p>Fill in the fields to publish your new blog.</p>
                <hr />
            </div>
            {
                modals.emptyFieldsModal && (
                    <div className="empty-fields-modal modal">
                        {!errMessage ? 
                            <h5>Please enter all fields before submitting</h5>
                            : <h5>{errMessage}</h5>
                        }
                    </div>
                )
            }
            <form className="create-form" onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="title">Enter new Blog Title:</label>
                    <input type="text" name="title" placeholder="Blog Title..." value={ formInputs.title }
                        onChange={ handleChange } onBlur={ handleOnBlur }
                        style={ emptyField.title ? errorBorderStyle : null } />
                    { emptyField.title && <small style={errorTextColor}>Please enter the Post's Title</small> }
                </div>
                <div className="form-group">
                    <label htmlFor="description">Enter Blog Description:</label>
                    <small>The description will be shown when people look at all blog posts!</small>
                    <input type="text" name="description" placeholder="Blog Description..." 
                        value={ formInputs.description } onChange={ handleChange } onBlur={ handleOnBlur }
                        style={ emptyField.description ? errorBorderStyle : null } />
                    { emptyField.description && <small style={errorTextColor}>Please enter the Post's Description</small> }
                </div>
                <div className="form-group">
                    <label htmlFor="body">Enter new Blog content:</label>
                    <textarea type="text" name="body" value={ formInputs.body }
                        placeholder="Blog Content..." rows="10" onChange={ handleChange }
                        onBlur={ handleOnBlur } style={ emptyField.body ? errorBorderStyle : null }></textarea>
                    { emptyField.body && <small style={errorTextColor}>Please enter the Post's Content</small> }
                </div>
                <div className="form-group">
                    <label htmlFor="imageFile">Choose an image to go along with the blog:</label>
                    <input type="file" name="imageFile"
                        onChange={ e => setFormInputs(prevState => ({
                            ...prevState,
                            imageFile: e.target.files[0]
                        })) } />
                </div>
                <div className="form-group-btn">
                    <button type="submit">
                        {showSpinner ? <Spinner /> : 'Post Blog'}
                    </button>
                    <Link to="/">Cancel</Link>
                    
                </div>
                {
                    modals.successModal &&
                    (
                        <div className="success-text">
                            <h5>&#10003; - Your Blog has been posted!</h5>
                            <p>You will automatically be redirected to your posts. <Link to="/my-posts">Click here</Link> if you havent</p>
                        </div>
                    )
                }
            </form>
        </section>
    );

};

export default CreateBlog;