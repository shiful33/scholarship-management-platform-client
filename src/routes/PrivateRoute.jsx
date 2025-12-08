import React from 'react';
import useAuth from '../hooks/useAuth';
import { Commet } from 'react-loading-indicators';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const {user, loading} = useAuth();
    const location = useLocation();   

    if(loading) {
        return <div className='flex justify-center items-center'>
            <Commet color="#0c5f5a" size="medium" text="" textColor="" />
        </div>
    }

    if(!user) {
        return <Navigate state={location.pathname} to="/login" />
    }

    return children;
};

export default PrivateRoute;