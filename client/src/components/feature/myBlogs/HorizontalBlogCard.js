import { Link } from 'react-router-dom';

//UI Component to show the posts. Different Style than RecentBlogs
const HorizontalBlogCard = ({ title, desc, userId, postId }) => {

    const cardLink = `/posts/${postId}`;
    return(
        <Link to={ cardLink } className="my-post-card">
            <div className="content">
                <div className="color-section"></div>
                <p className="post-title">{ title }</p>
                <p className="post-desc">{ desc }</p>
                <p className="post-ids">{ postId } | { userId }</p>
            </div>
            <div className="card-btns">
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
            </div>
        </Link>
    );
};

export default HorizontalBlogCard;