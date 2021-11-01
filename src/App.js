import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import FirebaseAuth from './Firebase/FirebaseAuth';
import Home from './Components/Home/Home';
import NoMatch from './Components/NoMatch/NoMatch';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Order from "./Components/Order/Order";
import ThankYou from './Components/ThankYou/ThankYou';
import OrderList from './Components/OrderList/OrderList';
import AddPackages from './Components/AddPackages/AddPackages';

function App() {
  return (
    <Router>
            <Switch>
                <Route path="/login">
                    <FirebaseAuth/>
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/home">
                    <Home />
                </Route>
                <PrivateRoute path="/order/:name">
                    <Order />
                </PrivateRoute>
                <PrivateRoute path="/thank-you">
                    <ThankYou />
                </PrivateRoute>
                <PrivateRoute  path="/bookings/:id">
                    <OrderList />
                </PrivateRoute>
                <PrivateRoute exact path="/bookings">
                    <OrderList />
                </PrivateRoute>
                <PrivateRoute path="/addService">
                    <AddPackages />
                </PrivateRoute>
                
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        </Router>
  );
}

export default App;
