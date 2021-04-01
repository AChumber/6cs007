import { useState, useEffect, useCallback } from 'react';
import BlogCard from '../../shared/card/BlogCard';
import './posts.css'
import Chevron from '../../../assets/images/Chevron.svg';
import Loading from '../../shared/loading/Loading';
import Spinner from '../../shared/spinner/Spinner';
import SeachPosts from './SeachPosts';

//Component that renders all blog posts on the website
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [isLoading, setisLoading] = useState(true);
    const [isFetchingNew, setIsFetchingNew] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    //Fetch Data from endpoint. Specifying limit and start based of component state
    const fetchData = useCallback(
        () => {
            posts.length > 0 ? setIsFetchingNew(true) : setisLoading(true);
            fetch(`/api/blogpost/?offset=${posts.length}&limit=${limit}`)
                .then(res => res.json())
                .then(resJson => {
                    if(resJson.status === 404) {
                        setErrMessage(resJson.msg);
                    } else{
                        //Check length of blogs and set error as there are no more to search
                        resJson.blogs.length === 0 ? 
                            setErrMessage('No More Blog Posts.') :
                            setPosts([...posts, ...resJson.blogs])
                    }
                    setisLoading(false); setIsFetchingNew(false);
            })
        }        
        , [limit, posts]
        );

    useEffect(() => {
        fetchData(); 
    }, [fetchData]);

    //Handle the change in the select element to change limit in API endpoint
    const handleChange = (e) => {
        setLimit(e.target.value);
    }

    return(
        <section className="content-section">
            <div className="header-posts">
                <h2>Blog Posts</h2>
                <hr />
            </div>
            <SeachPosts />
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
                    isLoading ? <Loading /> : posts.map(post => <BlogCard key={post._id} post={post} />) 
                }
            </div>
            {!errMessage ?
                (<div className="chevron">
                    {
                        isFetchingNew ? <Spinner /> :    
                        (<button onSubmit={ e => e.preventDefault() } onClick={ () => fetchData() }>
                            <img src={Chevron} alt="Chevron to load more posts"/>
                        </button>)
                    }
                </div>) :
                (<div className="error-message">
                    <h5>{ errMessage }</h5>
                </div>)
            }
        </section>
    )
};

export default Posts;