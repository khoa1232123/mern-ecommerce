import './App.scss';
import HomePage from './containers/HomePage';
import { Route, Switch } from 'react-router-dom';
import ProductListPage from './containers/ProductListPage';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
