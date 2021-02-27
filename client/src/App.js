import Landing from './components/feature/landing/Landing';
import Login from "./components/feature/login/Login"
import Footer from './components/layout/footer/Footer';
import Navbar from "./components/layout/navbar/Navbar";
import { BrowserRouter,Switch,Route } from 'react-router-dom';
const App = () => {
  return(
    <div className="App">
      <BrowserRouter>

        
        <Switch>
          <Route exact path="/login" component={ Login } />
          <>
            <Navbar isLoggedIn={ false } />
            <Route exact path="/" component={ Landing } />
            <Footer isLoggedIn={ false } />
          </>
        </Switch>
        
        
      </BrowserRouter>
    </div>
  );
}

export default App;