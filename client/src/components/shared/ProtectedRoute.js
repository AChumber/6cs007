//Component to ensure validation when entering a protected route. If not authed then user will be 
//redirected and told to log in/create account
import { useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'; 
import { UserContext } from '../../context/UserContext';

function ProtectedRoute({ component: Component, ...rest }) {
    const [user] = useContext(UserContext);

    return (
        <Route 
            {...rest}
            render={ (props) =>{
                return user.isLoggedIn ? 
                    //user is logged in
                    <Component /> :
                    <Redirect to={{
                        pathname: '/',
                        state: {
                            from: props.location
                        }}} /> 
            }            
        }/>
    );
}

export default withRouter(ProtectedRoute);
