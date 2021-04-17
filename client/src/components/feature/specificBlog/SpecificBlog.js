import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../shared/loading/Loading';
import Comments from './comments/Comments';
import NoPost from './NoPost';
import "./specificBlog.css";

//Component to show the specific blog using id passed as URL parameter
const SpecificBlog = () => {
    const { id } = useParams();
    const [post, setPost] = useState({}); //Get JSON for post id 
    const [isLoading, setIsLoading] = useState(true);
    const [isShowComments, setIsShowComments] = useState(false);
    
    useEffect(() => {
        fetch(`/api/blogpost/${id}`)
            .then(res => res.json())
            .then(jsonRes => {
                setPost(jsonRes.blog);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, [id]);

    const toggleComments = () => {
        setIsShowComments(!isShowComments);
    };

    const updateCommentsArray = (commentObj) => {
        if(!commentObj) { return null }
        setPost(prevState => (
            {
                ...prevState,
                comments: [...prevState.comments, commentObj]
            }
        ))
    }

    return(
        <>
            {isLoading ? <Loading /> :
            Object.keys(post).length === 0 ? <NoPost /> : (
                <section className={ "specific-blog-container " +(isShowComments ? "comments-on" : '') } >
                    <div className={ "post " +(isShowComments ? "post-comments-layout" : '') }>
                        <div className="post-heading">
                            { post.postImgUrl && <img className="post-image" src={ post.postImgUrl } alt={ post.postTitle } loading="lazy" rel="preload"/> }
                            <div className={post.postImgUrl ? "post-heading-wrapper img-relative" : "post-heading-wrapper"}>
                                <h1>{ post.postTitle }</h1>
                                <p className="post-author">by { post.authorName }</p>
                                <p className="post-date">Posted on: { new Date(post.posted).toDateString() }</p> 
                                <hr />
                            </div>
                        </div>
                        <div className="specific-post-desc">
                            <p><i>{ post.postDesc }</i></p>
                        </div>
                        <div className="specific-post-body">
                            <p>{ post.postBody }</p>
                        </div>
                    </div>

                    { isShowComments ? <Comments postId={ id } toggleOff={ toggleComments } comments={post.comments} updateCommentsArray={ updateCommentsArray } /> : (
                        <button className="comments-btn" 
                            onClick={ () => toggleComments() }>Comments</button>) }
                </section>
            )}
        </>
    );

};

export default SpecificBlog;