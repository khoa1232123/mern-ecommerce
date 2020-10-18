import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Sidebar from '../Sidebar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem('token');
        if (token) {
          return (
            <Sidebar>
              <Component {...props} />
            </Sidebar>
          );
        } else {
          return <Redirect to={'/signin'} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
