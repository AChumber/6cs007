import { useState, useContext } from 'react';
import { errorBorderStyle, errorTextColor } from '../../../shared/ErrorStyles';
import { UserContext } from '../../../../context/UserContext';

//Component to hold the form for is the user is logged in and wanting to post a comment
const CommentPostForm = ({ postId, updateCommentsArray }) => {
    const [commentBody, setCommentBody] = useState('');
    const [isEmptyInput, setIsEmptyField] = useState(false);
    const [user] = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!commentBody) {
            setIsEmptyField(true);
        }
        
        const response = await fetch('/api/blogpost/comment/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                commentAuthor: `${user.firstName} ${user.surname}`,
                commentBody: commentBody,
                postId: postId
            })
        });
        const jsonRes = await response.json();
        if(!response.ok){
            console.log("response not ok");
        }
        if(response.status === 200) {
            updateCommentsArray(jsonRes.comment)
            setCommentBody('');
            console.log('Comment posted', jsonRes);
        } else {
            console.log(jsonRes);
        }
        
        
    }

    return (
        <form className="comment-form" onSubmit={ handleSubmit }>
            <div className="form-input comment-form-input">
                <label htmlFor="comment-post">Enter your Comment:</label>
                <input type="text" name="comment-post" value={ commentBody }
                    placeholder="Enter comment..."
                    onChange={ (e) => setCommentBody(e.target.value) }
                    onBlur={ () => !commentBody ? setIsEmptyField(true) : setIsEmptyField(false) }
                    style={ isEmptyInput ? errorBorderStyle : null } />
                {isEmptyInput && <small style={ errorTextColor }>Please enter your comment before posting.</small>}
            </div>
            <button type="submit">Post</button>
        </form>
    )
}

export default CommentPostForm
