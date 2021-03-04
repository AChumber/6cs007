import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../shared/loading/Loading';
import Comments from './Comments';
import NoPost from './NoPost';
import "./specificBlog.css";

//Component to show the specific blog using id passed as URL parameter
const SpecificBlog = () => {
    const { id } = useParams();
    const [post, setPost] = useState({}); //Get JSON for post id 
    const [isLoading, setIsLoading] = useState(true);
    const [isShowComments, setIsShowComments] = useState(false);
    
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(jsonRes => {
                setPost(jsonRes);
                setIsLoading(false);
                console.log(post);
            })
            .catch(err => console.log(err));
    }, []);

    const toggleComments = () => {
        setIsShowComments(!isShowComments);
    };

    return(
        <>
            {isLoading ? <Loading /> :
            Object.keys(post).length === 0 ? <NoPost /> : (
                <section className={ "specific-blog-container " +(isShowComments && "comments-on") } >
                    <div className="post">
                        <div className="post-heading">
                            <h1>{ post.title }</h1>
                            <p className="post-author">by { post.userId }</p>
                            <p className="post-date">Posted on: --th Jan 2020</p> 
                            <hr />
                        </div>
                        <div className="post-body">
                            <p>{ post.body }</p>
                        </div>
                    </div>

                    { isShowComments ? <Comments postId={ id } toggleOff={ toggleComments } /> : (
                        <button className="comments-btn" 
                            onClick={ () => toggleComments() }>Comments</button>) }
                </section>
            )}
        </>
    );

};

export default SpecificBlog;