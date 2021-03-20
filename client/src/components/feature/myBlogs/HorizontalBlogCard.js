import { Link } from 'react-router-dom';

//UI Component to show the posts. Different Style than RecentBlogs
const HorizontalBlogCard = ({ title, desc, userId, postId, handleDelete }) => {
    const cardLink = `/posts/${postId}`;
    return(
        <div  className="my-post-card">
            <Link to={ cardLink } className="content">
                <div className="color-section"></div>
                <p className="post-title">{ title }</p>
                <p className="post-desc">{ desc }</p>
                <p className="post-ids">{ postId } | { userId }</p>
            </Link>
            <div className="card-btns">
                <button className="edit">Edit</button>
                <button className="delete" onClick={ () => handleDelete(postId) }>Delete</button>
            </div>
        </div>
    );
};

export default HorizontalBlogCard;