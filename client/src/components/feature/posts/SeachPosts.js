import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';

const SeachPosts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [resultsList, setResultsList] = useState([]);
    const history = useHistory();

    const handleInputchange = debounce((e) => {
        setSearchQuery(e.target.value);

        //Fetch Posts and add them to the #search-results div. Will show as a dropdown under the input
        if(e.target.value.length === 0) {
            setSearchQuery('');
            setResultsList([]);
        } else {
            //debounce input which will only send a request after 500ms of no typing
            getResultBasedOnInput(searchQuery);
        }
    }, 500);

    const getResultBasedOnInput = async (query) => {
        await fetch(`/api/blogpost/search?query=${query}`)
            .then(res => {
                if(res.status === 200) return res.json()
                else return;
            })
            .then(resJson => {
                //Check length of blogs and set error as there are no more to search
                resJson.blogs.length === 0 ? setResultsList([]) : setResultsList([...resJson.blogs])
            })
            .catch(err => console.log(err));
    }

    const boldSearchResult = title => {
        let changedTitle = title.toLowerCase();

        return(changedTitle.replaceAll(searchQuery, '<b>'+searchQuery+'</b>'));
    }

    return (
        <div className="search-box">
            <input type="text" placeholder="Search for Blog Posts..." onChange={ (e) => handleInputchange(e) } />
            { searchQuery.length > 0 && 
                (<div id="search-results">
                    <ul>
                        { resultsList.length > 0 && 
                            (
                                resultsList.map(result => <li key={ result._id } 
                                                            onClick={ () => history.push(`/posts/${result._id}`) }>
                                                                <span dangerouslySetInnerHTML={{__html: boldSearchResult(result.postTitle)}} />
                                                            </li>)
                            ) 
                        }
                    </ul>
                </div>)
            }
        </div>
    )
}

export default React.memo(SeachPosts);