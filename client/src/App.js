import Landing from './components/feature/landing/Landing';
import Login from "./components/feature/login/Login"
import Footer from './components/layout/footer/Footer';
import Navbar from "./components/layout/navbar/Navbar";
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import { useState } from 'react';
import SpecificBlog from './components/feature/specificBlog/SpecificBlog';
import Posts from './components/feature/posts/Posts';
import CreateBlog from './components/feature/createBlog/CreateBlog';
const App = () => {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  return(
    <div className="App">
      <BrowserRouter>

        
        <Switch>
          <Route exact path="/login" 
            render={() => <Login isLoggingIn={true}/>} />
          <Route exact path="/create-account" 
            render={() => <Login isLoggingIn={false}/>} />
          <>
            <Navbar isLoggedIn={ isLoggedIn } />
            <Route exact path="/" component={ Landing } />
            <Route exact path="/posts/:id" component={ SpecificBlog } />
            <Route exact path="/posts" component={ Posts } />
            <Route exact path="/create-post" component={ CreateBlog } />
            <Footer isLoggedIn={ isLoggedIn } />
          </>
        </Switch>
        
        
      </BrowserRouter>
    </div>
  );
}

export default App;