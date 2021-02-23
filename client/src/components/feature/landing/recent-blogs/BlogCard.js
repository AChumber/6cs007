//child Component - Recieve props and create the card
import './recentBlogs.css';

const BlogCard = ({ post }) => {
    return(
        <div className="blog-card">
            <h6>{ post.title }</h6>
            <p>{ post.body }</p>
            <p className="post-author">{ post.userId } | id: { post.id }</p>
        </div>
    );
};

export default BlogCard;