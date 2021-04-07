import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import HorizontalBlogCard from "./HorizontalBlogCard"
import { UserContext } from '../../../context/UserContext';
import "./MyBlogs.css";

//Show all user blog posts with options to edit or delete
const MyBlogs = () => {
    const [myBlogs, setMyBlogs] = useState([]);
    const [user] = useContext(UserContext);

    useEffect(()=>{
        //Get all posts with user email and save to state. 
        fetch('api/blogpost/my-posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorisation': user.token
            },
            body: JSON.stringify({
                authorEmail: user.email
            })
        })
            .then(res => res.json())
            .then(resJson => setMyBlogs([...resJson.blogs]));
    }, [user.email, user.token]);

    //Send Delete to api and remove from myBlogs state to update UI
    const handleDelete = async (postId) => {
        const response = await fetch(`/api/blogpost/${postId}`, { method: 'DELETE', headers: { authorisation: user.token } });
        await response.json();
        if(response.status === 200) {
            const remainingPosts = myBlogs.filter(blog => blog._id !== postId); 
            setMyBlogs([...remainingPosts]);
        } else {
            console.log("Couldn't delete post");
        }
    }

    return(
        <section className="content-section post-list-container">
            <div className="header">
                <h2>My Blogs</h2>
                <p>Here are all your published blogs, where you can edit or delete them</p>
                <hr />
            </div>
            <div className="my-blogs-grid">
                { 
                    myBlogs.length === 0 ? (
                        <div className="no-posts">
                            <p>You currently have no posts published</p>
                            <p><i><Link to={{ pathname: "/create-post", state: { prevPath: 'navbar' }}}>Click here</Link></i> to Create a blog</p>
                        </div>
                    ) :
                    (
                        myBlogs.map(post => <HorizontalBlogCard postId={ post._id } title={ post.postTitle }
                                            desc={ post.postDesc } body={ post.postBody } key={ post._id } 
                                            userName={ post.authorName } handleDelete={ handleDelete } />)
                    )
                }
            </div>
        </section>
    );
};

export default MyBlogs;