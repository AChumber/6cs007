import Landing from './components/feature/landing/Landing';
import Login from "./components/feature/login/Login"
import Footer from './components/layout/footer/Footer';
import Navbar from "./components/layout/navbar/Navbar";
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import { useState } from 'react';
import SpecificBlog from './components/feature/specificBlog/SpecificBlog';
import Posts from './components/feature/posts/Posts';
import CreateBlog from './components/feature/createBlog/CreateBlog';
import MyBlogs from './components/feature/myBlogs/MyBlogs';
import { UserContext } from './context/UserContext';
import ProtectedRoute from './components/shared/ProtectedRoute';

const App = () => {
  //State used in context API
  const [user, setUser] = useState({
    isLoggedIn: false
  });

  return(
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <BrowserRouter>
          
          <Switch>
            <Route exact path="/login" 
              render={() => <Login isLoggingIn={true}/>} />
            <Route exact path="/create-account" 
              render={() => <Login isLoggingIn={false}/>} />
            <>
              <Navbar isLoggedIn={ user.isLoggedIn } />
                <Route exact path="/" component={ Landing } />
                <Route exact path="/posts/:id" component={ SpecificBlog } />
                <Route exact path="/posts" component={ Posts } />
                <ProtectedRoute exact path="/create-post" component={ CreateBlog } />
                <ProtectedRoute exacy path="/my-posts" component={ MyBlogs } />
              <Footer isLoggedIn={ user.isLoggedIn } />
            </>
          </Switch>
          
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;