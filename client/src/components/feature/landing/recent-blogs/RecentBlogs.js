//Child component to display recent blogs for Landing Page.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../../../shared/card/BlogCard';
import Loading from '../../../shared/loading/Loading';
import './recentBlogs.css';

const RecentBlogs = () => {
    const [posts, setPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [fetchErr, setFetchErr] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await fetch('/api/blogpost/mostrecent')
                .then(res => {
                    if(res.status === 500){
                        setFetchErr(true);
                    }
                    return res.json()
                })
                .then(resJson => {
                    if(resJson.blogs.length === 0){
                        setFetchErr(true);
                    } else {
                        setPosts([...resJson.blogs]);
                    }
                    setIsFetching(false);
                })
                .catch(err => console.log(err));
    }

    return(
        <section>
            <div className="section-heading">
                <h2>Recent Blogs</h2>
                <hr />
            </div>
            <div className="blog-grid">
                { isFetching ? <Loading /> : 
                (fetchErr ? <ErrorDiv /> : posts.map(post => <BlogCard key={post._id} post={post} />) )}
            </div>
            <div className="btn-container">
                <Link to='/posts' className="link-btn">Find more Posts</Link>
            </div>
        </section>
    );
}

const ErrorDiv = () => {
    return(
        <div className="error-fetching" style={{gridColumn: "2"}}>
            <h6>We Couldn't Find any Posts</h6>
            <p><Link to="/create-post">Click Here</Link> to create your own post!</p>
        </div>
    )
}

export default React.memo(RecentBlogs);