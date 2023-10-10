import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types/interface';

interface PrivateRouteProps {
  component: React.FC<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user?.isLogin );
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    navigate('/login');
    return null; // Render nothing while redirecting
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
