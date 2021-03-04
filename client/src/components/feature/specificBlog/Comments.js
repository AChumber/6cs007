
const Comments = ({ postId, toggleOff }) => {
    return(
        <div className="comments-container">
            <p>Comments go here</p>
            <button onClick={() => toggleOff()}>Close Comments</button>
        </div>
    );
};

export default Comments;