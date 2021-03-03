import { useState } from 'react';
import { Link } from 'react-router-dom';
import './createBlog.css';

//Form component to create a new blog
const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [body, setBody] = useState("");

    return(
        <section className="content-section">
            <div className="header">
                <h1>Create a new Blog</h1>
                <p>Fill in the fields to publish your new blog.</p>
                <hr />
            </div>
            <form className="create-form">
                <div className="form-group">
                    <label htmlFor="title">Enter new Blog Title:</label>
                    <input type="text" name="title" placeholder="Blog Title..."
                        onChange={ (e)=> setTitle(e.target.value) }/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Enter Blog Description:</label>
                    <small>The description will be shown when people look at all blog posts!</small>
                    <input type="text" name="description" placeholder="Blog Description..."
                        onChange={ (e)=> setDesc(e.target.value) }/>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Enter new Blog content:</label>
                    <textarea type="text" name="body"
                        placeholder="Blog Content..." rows="10" onChange={ (e)=>setBody(e.target.value) }></textarea>
                </div>
                <div className="form-group-btn">
                    <button>Post Blog</button>
                    <Link to="/">Cancel</Link>
                </div>
            </form>
        </section>
    );

};

export default CreateBlog;