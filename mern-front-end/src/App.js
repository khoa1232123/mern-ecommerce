import './App.scss';
import HomePage from './containers/HomePage';
import { Route, Switch } from 'react-router-dom';
import ProductListPage from './containers/ProductListPage';
import Layout from './components/Layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './redux/actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(isUserLoggedIn());
    if (auth.authenticate) {
      console.log('abc');
      dispatch(updateCart());
    }
  }, [dispatch, auth.authenticate]);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
          <Route path="/cart" component={CartPage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
