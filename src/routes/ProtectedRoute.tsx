import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { RoleTypes } from '../types/User.types';
import ErrorPage from '../pages/ErrorPage';
import CircleSpinner from '../components/spinners/CircleSpinner';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
    const location = useLocation();
    const { token, loading, user } = useAuth();
    const role = user?.role;

    if (loading) {
        return <CircleSpinner />;
    }

    return (
        role && allowedRoles.includes(role)
            ? <Outlet />
            : token
                ? <ErrorPage type="403" />
                : <Navigate to="/login" state={{ path: location.pathname }} replace />
    );
};

export default ProtectedRoute;
