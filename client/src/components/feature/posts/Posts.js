import { useState, useEffect } from 'react';
import BlogCard from '../../shared/card/BlogCard';
import './posts.css'
import Chevron from '../../../assets/images/Chevron.svg';

//Component that renders all blog posts on the website
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        fetchData(); 
    }, [])

    //Fetch Data from enpoint. Specifying limit and start based of component state
    const fetchData = () => {
        setisLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/posts?_start=${posts.length}&_limit=${limit}`)
            .then(res => res.json())
            .then(resJson => {
                setPosts([...posts, ...resJson]);
                setisLoading(false);
            });        
    }

    //Handle the change in the select element to change limit in API endpoint
    const handleChange = (e) => {
        setLimit(e.target.value);
    }

    return(
        <section className="content-section">
            <div className="header-posts">
                <h1>Blog Posts</h1>
                <hr />
            </div>
            <div className="search-box">
                <input type="text" placeholder="Search for Blog Posts..." />
                <button>Search</button>
                <div id="search-results">
                </div>
            </div>
            <div className="show-amount">
                <label htmlFor="amount-list">Select amount to show:</label>
                <select value={limit} onChange={ e => handleChange(e) } id="amount-list">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
            <div className="post-results-grid">
                {  
                    posts.map(post => <BlogCard key={post.id} post={post} />) 
                }
            </div>
            <div className="chevron">
                <button onClick={ () => fetchData() }>
                    <img src={Chevron} />
                </button>
            </div>
        </section>
    )
};

export default Posts;