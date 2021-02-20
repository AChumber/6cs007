//Landing page component
import Hero from "./hero/Hero"
import RecentBlogs from "./recent-blogs/RecentBlogs"

const Landing = () => {
    const containerStyle = {
        width: "90%",
        margin: "auto"
    }
    return(
        <>
            <Hero />
            <div className="container" style={ containerStyle }>
                <RecentBlogs />
            </div>
        </>
    );
};

export default Landing;