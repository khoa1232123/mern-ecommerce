import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Layout from './components/Layout';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUserLoggedIn } from './redux/actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import Page from './containers/Page';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
      dispatch(getInitialData());
    }
  });

  return (
    <div className="App">
      <Layout>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/page" component={Page} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Orders} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
