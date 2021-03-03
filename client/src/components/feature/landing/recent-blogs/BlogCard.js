//child Component - Recieve props and create the card
import { useHistory } from 'react-router-dom';
import './recentBlogs.css';

const BlogCard = ({ post }) => {
    const history = useHistory();

    return(
        <div className="blog-card" onClick={ () => history.push(`/posts/${post.id}`) }>
            <h6>{ post.title }</h6>
            <p>{ post.body }</p>
            <p className="post-author">{ post.userId } | id: { post.id }</p>
        </div>
    );
};

export default BlogCard;