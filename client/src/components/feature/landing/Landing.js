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
            <div style={ containerStyle }>
                <RecentBlogs />
            </div>
        </>
    );
};

export default Landing;