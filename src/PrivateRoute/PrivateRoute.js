import { Route, Redirect } from "react-router-dom"
import { Context, useGlobalContext } from '../Context/Context';

const PrivateRoute = ({children, ...rest}) => {
    
    const {isLogin} = useGlobalContext(Context)

    return (
        <Route
        {...rest}
        render={({ location }) =>
          isLogin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    )
}

export default PrivateRoute
