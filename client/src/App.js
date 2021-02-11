import Login from "./components/feature/login/Login"
import Navbar from "./components/layout/navbar/Navbar";
//<Navbar isLoggedIn={ false }/>

const App = () => {
  return (
    <div className="App">
      <Login />   
    </div>
  );
}

export default App;