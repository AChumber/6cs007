//Landing page component
import React from 'react';
import Hero from "./hero/Hero"
import RecentBlogs from "./recent-blogs/RecentBlogs"

const Landing = () => {
    const containerStyle = {
        width: "90%",
        margin: "auto"
    }
    return(
        <div className='content-section'>
            <Hero />
            <div style={ containerStyle }>
                <RecentBlogs />
            </div>
        </div>
    );
};

export default React.memo(Landing);