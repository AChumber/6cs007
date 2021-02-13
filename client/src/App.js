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
          <Route exact path="/login" >
            <Login />
          </Route>
        </Switch>

        <Navbar isLoggedIn={ false } />
        <Switch>
          <Route exact path="/" component={ Landing } />
        </Switch>
        <Footer isLoggedIn={ false } />
        
      </BrowserRouter>
    </div>
  );
}

export default App;