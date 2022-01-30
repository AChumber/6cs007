import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

//UI Component to show the posts. Different Style than RecentBlogs
const HorizontalBlogCard = ({ title, desc, body, postId, userName, handleDelete }) => {
    const cardLink = `/posts/${postId}`;
    return(
        <div  className="my-post-card">
            <Link to={ cardLink } className="content">
                <div className="color-section"></div>
                <p className="post-title">{ title }</p>
                <p className="post-desc">{ desc }</p>
                <div className="post-body" dangerouslySetInnerHTML={ { __html : DOMPurify.sanitize(body) } }></div>
                <p className="post-ids">{ postId } | { userName }</p>
            </Link>
            <div className="card-btns">
                <Link className="edit" to={{
                    pathname: `/edit-blog/${postId}`,
                    state: {
                        prevPath: window.location.pathname
                    }
                }}>Edit</Link>
                <button className="delete" onClick={ () => handleDelete(postId) }>Delete</button>
            </div>
        </div>
    );
};

export default HorizontalBlogCard;