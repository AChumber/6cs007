import { Link } from 'react-router-dom';
const NoPost = () => {
    return(
        <div className="no-content">
            <h4>Hmmm. Could not find that post.</h4>
            <p>Go back <Link to="/">Home</Link></p>
            <p>Or look at a <Link to="/posts">List of Posts</Link></p>
        </div>
    );
};

export default NoPost;