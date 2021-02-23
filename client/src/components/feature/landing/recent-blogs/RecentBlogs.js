//Child component to display recent blogs for Landing Page.
import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import Loading from '../../../shared/loading/Loading';
import './recentBlogs.css';

const RecentBlogs = () => {
    const [posts, setPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetch('http://jsonplaceholder.typicode.com/posts?&_limit=3')
            .then(res => res.json())
            .then(resJson => {
                setPosts(resJson);
                setIsFetching(!isFetching);
            })
            .catch(err => console.log(err));
    }, [])

    return(
        <section>
            <div className="section-heading">
                <h1>Most Recent Blogs</h1>
                <hr />
            </div>
            <div className="blog-grid">
                { isFetching? <Loading /> : posts.map(post => <BlogCard key={post.id} post={post} />) }
            </div>
        </section>
    );
}

export default RecentBlogs;