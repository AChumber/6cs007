import { useState, useEffect } from "react";
import HorizontalBlogCard from "./HorizontalBlogCard"
import "./MyBlogs.css";

//Show all user blog posts with options to edit or delete
const MyBlogs = () => {
    const [myBlogs, setMyBlogs] = useState([]);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
            .then(res => res.json())
            .then(resJson => setMyBlogs(resJson));
    }, []);

    return(
        <section className="content-section">
            <div className="header">
                <h1>My Blogs</h1>
                <p>Here are all your published blogs, where you can edit or delete them</p>
                <hr />
            </div>
            <div className="my-blogs-grid">
                { myBlogs.map(post => <HorizontalBlogCard postId={ post.id } title={ post.title } desc={ post.body } userId={ post.userId } key={ post.id } />) }
            </div>
        </section>
    );
};

export default MyBlogs;