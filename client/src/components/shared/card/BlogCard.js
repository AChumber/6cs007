//child Component - Recieve props and create the card
import { useHistory } from 'react-router-dom';
import React from 'react';
import './blogCard.css';

const BlogCard = ({ post }) => {
    const history = useHistory();

    return(
        <div className="blog-card" onClick={ () => history.push(`/posts/${post._id}`) }>
            <h6>{ post.postTitle }</h6>
            <p>{ post.postDesc }</p>
            <p className="post-author">{ post.authorName && (`By ${post.authorName}`) }</p>
        </div>
    );
};

export default React.memo(BlogCard);