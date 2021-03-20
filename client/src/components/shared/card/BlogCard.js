//child Component - Recieve props and create the card
import { useHistory } from 'react-router-dom';
import './blogCard.css';

const BlogCard = ({ post }) => {
    const history = useHistory();

    return(
        <div className="blog-card" onClick={ () => history.push(`/posts/${post._id}`) }>
            <h6>{ post.postTitle }</h6>
            <p>{ post.postDesc }</p>
            <p className="post-author">{ post.authorEmail }</p>
        </div>
    );
};

export default BlogCard;