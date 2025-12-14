import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth(); 

    const { role, isLoading: isRoleLoading } = useRole(); 
    const location = useLocation();

    // Loading State
    if (loading || isRoleLoading) {
        
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl font-semibold text-red-600">Checking Admin Status...</p>
                {/* <LoaderComponent /> */}
            </div>
        );
    }

    if (user && role === 'admin') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;