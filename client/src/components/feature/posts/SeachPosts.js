import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SeachPosts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [resultsList, setResultsList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        //Fetch Posts and add them to the #search-results div. Will show as a dropdown under the input
        searchQuery.length === 0 ? setResultsList([]) : (
            fetch(`/api/blogpost/search?query=${searchQuery}`)
                .then(res => {
                    if(res.status === 200) return res.json()
                    else return;
                })
                .then(resJson => {
                    //Check length of blogs and set error as there are no more to search
                    resJson.blogs.length === 0 ? setResultsList([]) : setResultsList([...resJson.blogs])
                }))
    }, [searchQuery]);

    return (
        <div className="search-box">
            <input type="text" placeholder="Search for Blog Posts..." onChange={ (e) => setSearchQuery(e.target.value) } />
            { searchQuery.length > 0 && 
                (<div id="search-results">
                    <ul>
                        { resultsList.length === 0 ? <p><b>Cannot find any posts</b></p> : 
                            resultsList.map(result => <li key={ result._id } 
                                                        onClick={ () => history.push(`/posts/${result._id}`) }>
                                                            { result.postTitle }</li>) }
                    </ul>
                </div>)
            }
        </div>
    )
}

export default SeachPosts
