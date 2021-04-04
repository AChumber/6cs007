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
import './App.css';
import NoPost from './components/feature/specificBlog/NoPost';
import NotAuthed from './components/feature/notAuthed/NotAuthed';
import NoMatch404 from './components/feature/404Page/NoMatch404';

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
                <Switch>
                  <Route exact path="/" component={ Landing } />
                  <Route exact path="/posts/:id" component={ SpecificBlog } />
                  <Route exact path="/posts" component={ Posts } />
                  <Route exact path="/no-post" component={ NoPost } />
                  <Route exact path="/unauthorised" component={ NotAuthed } />
                  <ProtectedRoute exact path="/create-post" component={ CreateBlog } />
                  <ProtectedRoute exact path="/my-posts" component={ MyBlogs } />
                  <ProtectedRoute exact path="/edit-blog/:id" component={ CreateBlog } />
                  <Route component={ NoMatch404 } />
                </Switch>
              <Footer isLoggedIn={ user.isLoggedIn } />
            </>
          </Switch>
          
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;