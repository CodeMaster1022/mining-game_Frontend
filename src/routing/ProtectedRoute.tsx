import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();
    const token = localStorage.getItem('accessToken');
  
    // If there's a token, assume the user is authenticated while checking
    return (token || isAuthenticated) ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

export default PrivateRoute;