import { useContext } from 'react';
import CommentPostForm from './CommentPostForm';
import { UserContext } from '../../../../context/UserContext';
import '../specificBlog.css';

//Child component to display comments of a blog - passed via props
//Also send/post a comment on particular blog
const Comments = ({ postId, toggleOff, comments, updateCommentsArray }) => {
    const [user] = useContext(UserContext);

    return(
        <div className="comments-container">
            <button className="close-comments-btn" onClick={() => toggleOff()}>Close Comments</button>
            {
                (comments.length === 0) ? (
                    <>
                        <hr/>
                        <p className="no-comments">No Comments Here.<br />Be the First to comment!</p>
                        <hr/>
                    </>
                ) : 
                (
                    comments.map(comment => {
                        return(
                            <div className="comment" key={ comment._id }>
                                <p className="comment-body">{ comment.commentBody }</p>
                                <p className="comment-author">{ comment.commentAuthor }</p>
                                <p className="comment-date"><i>
                                    <small>{ new Date(comment.commentPosted).toLocaleDateString('en-GB') }</small>
                                </i></p>
                                <hr />
                            </div>)
                    })
                )
            }
            {  !user.isLoggedIn 
                ? <p className="not-logged-in">You must log in to comment</p> 
                : <CommentPostForm postId={ postId } updateCommentsArray={ updateCommentsArray }/>  }
        </div>
    );
};

export default Comments;