import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth = ({ allowedRoles }) => {
    const { user, token } = useAuth();
    const location = useLocation();
    if(!token){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />;
};
export default RequireAuth;