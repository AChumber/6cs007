import React, { useState, Suspense  } from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Landing from './components/feature/landing/Landing';
import { UserContext } from './context/UserContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Spinner from './components/shared/spinner/Spinner';
import './App.css';
import Footer from './components/layout/footer/Footer';
import Navbar from "./components/layout/navbar/Navbar";
const Login = React.lazy(() => import('./components/feature/login/Login'));
const SpecificBlog = React.lazy(() => import('./components/feature/specificBlog/SpecificBlog'));
const MyBlogs = React.lazy(() => import('./components/feature/myBlogs/MyBlogs'));
const CreateBlog = React.lazy(() => import('./components/feature/createBlog/CreateBlog'));
const Posts = React.lazy(() => import('./components/feature/posts/Posts'));
const NoPost = React.lazy(() => import('./components/feature/specificBlog/NoPost'));
const NotAuthed = React.lazy(() => import('./components/feature/notAuthed/NotAuthed'));
const NoMatch404 = React.lazy(() => import('./components/feature/404Page/NoMatch404'));
//import SpecificBlog from './components/feature/specificBlog/SpecificBlog';
//import Login from './components/feature/login/Login';
//import Posts from './components/feature/posts/Posts';
//import CreateBlog from './components/feature/createBlog/CreateBlog';
//import MyBlogs from './components/feature/myBlogs/MyBlogs';
//import NoPost from './components/feature/specificBlog/NoPost';
//import NotAuthed from './components/feature/notAuthed/NotAuthed';
//import NoMatch404 from './components/feature/404Page/NoMatch404';

const App = () => {
  //State used in context API
  const [user, setUser] = useState({
    isLoggedIn: false
  });

  return(
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <BrowserRouter>
        <Suspense fallback={<Spinner />}>
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
          </Suspense>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;