import { useState, useContext, useEffect } from 'react';
import { Link, Redirect, withRouter, useLocation, useParams, useHistory } from 'react-router-dom'; 
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
    const [isEditBlog, setIsEditBlog] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    const [user] = useContext(UserContext);
    const { state } = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const editBlogHeading = (<><h1>Edit your Blog</h1><p>Change any field to update your blog post.</p></>)
    
    useEffect(() => {
        if(state.prevPath === '/my-posts') {
            //GET post via URL id and populate state values with retrieved post
            const fetchBlogData = async() => {
                setIsEditBlog(true);
                await fetch(`/api/blogpost/${id}`)
                    .then(res => {
                        if(!res.ok) {
                            console.log('Couldnt get post');
                            history.push('/no-post');
                        }
                        return res.json();
                    })
                    .then(({ blog }) => {
                        //Set state to post retrieved
                        setFormInputs(prevState => ({
                            ...prevState,
                            title: blog.postTitle,
                            description: blog.postDesc,
                            body: blog.postBody
                        }));
                        blog.postImgUrl && setImgUrl( blog.postImgUrl);  
                    });
                }
            fetchBlogData();
        }
    }, [state, id, history])

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

            //Retrieve a compressed version of the image via q_70
            let compressedImgUrl = imageUrl.split('/');
            compressedImgUrl.splice(6, 0, 'q_70');
            return compressedImgUrl.join('/');
        }
        return imageUrl;
    }

    const handleSubmit = async (e) => {
        setShowSpinner(true);
        e.preventDefault();
        //If editing blog - update post in db else create a new document in db
        if(isEditBlog) {
            handlePostUpdate();
        } else {
            //Validate if fields are empty or not
            if(!formInputs.title || !formInputs.body || !formInputs.description) {
                setModals(prevState => ({ ...prevState, emptyFieldsModal: !prevState.emptyFieldsModal }));
                return null;
            } 

            //Upload image file to cloudify and return url to image
            const imagePath = await handleImageUpload();

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
                    postImgUrl: imagePath
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
    }

    //Handle update of blog if component is updating an existing blog
    const handlePostUpdate = async (e) => {
        //Validate if fields are empty or not
        if(!formInputs.title || !formInputs.body || !formInputs.description) {
            setModals(prevState => ({ ...prevState, emptyFieldsModal: !prevState.emptyFieldsModal }));
            return null;
        } 

        var imagePath = '';
        //If new file is uploaded then update the imgUrl in the db 
        if(formInputs.imageFile){
            //Upload image file to cloudify and return url to image
            imagePath = await handleImageUpload();
        }
        var reqBody = {
            postTitle: formInputs.title,
            postDesc: formInputs.description,
            postBody: formInputs.body,
        }; 
        //Add new image url if uploaded a new image
        reqBody = formInputs.imageFile ? Object.assign({ postImgUrl: imagePath }, reqBody) : reqBody;

        //Call API to update blog with id
        const res = await fetch(`/api/blogpost/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': user.token
            },
            body: JSON.stringify(reqBody)
        });
        const jsonRes = await res.json();
        if(res.status === 200){
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
                { isEditBlog ? editBlogHeading :  
                    (<>
                        <h1>Create a new Blog</h1>
                        <p>Fill in the fields to publish your new blog.</p>
                    </>)
                }
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
                    <label htmlFor="title">{isEditBlog ? 'Edit': 'Enter new'} Blog Title:</label>
                    <input type="text" name="title" placeholder="Blog Title..." value={ formInputs.title }
                        onChange={ handleChange } onBlur={ handleOnBlur }
                        style={ emptyField.title ? errorBorderStyle : null } />
                    { emptyField.title && <small style={errorTextColor}>Please enter the Post's Title</small> }
                </div>
                <div className="form-group">
                    <label htmlFor="description">{isEditBlog ? 'Edit': 'Enter'} Blog Description:</label>
                    <small>The description will be shown when people look at all blog posts!</small>
                    <input type="text" name="description" placeholder="Blog Description..." 
                        value={ formInputs.description } onChange={ handleChange } onBlur={ handleOnBlur }
                        style={ emptyField.description ? errorBorderStyle : null } />
                    { emptyField.description && <small style={errorTextColor}>Please enter the Post's Description</small> }
                </div>
                <div className="form-group">
                    <label htmlFor="body">{isEditBlog ? 'Edit': 'Enter new'} Blog content:</label>
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
                    { (isEditBlog && imgUrl !== '') && 
                        (
                            <>
                            <img src={ imgUrl } className="edit-image-thumbnail" alt={ formInputs.title } />
                            <p>Above image is the previous image uploaded. To change upload a new one</p>
                            </>
                        )}
                </div>
                <div className="form-group-btn">
                    <button type="submit">
                        {showSpinner ? <Spinner /> : ( isEditBlog ? 'Update Blog' :'Post Blog')}
                    </button>
                    <Link to="/">Cancel</Link>
                    
                </div>
                {
                    modals.successModal &&
                    (
                        <div className="success-text">
                            <h5>&#10003; - Your Blog has been { isEditBlog ? 'updated' : 'posted' }!</h5>
                            <p>You will automatically be redirected to your posts. <Link to="/my-posts">Click here</Link> if you havent</p>
                        </div>
                    )
                }
            </form>
        </section>
    );

};

export default withRouter(CreateBlog);