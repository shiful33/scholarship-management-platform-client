import React from 'react';
import useAuth from '../hooks/useAuth';
import { Commet } from 'react-loading-indicators';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {

    const {user, loading} = useAuth();

    if(loading) {
        return <div className='flex justify-center items-center'>
            <Commet color="#0c5f5a" size="medium" text="" textColor="" />
        </div>
    }

    if(!user) {
        return <Navigate to="/login" />
    }

    return children;
};

export default PrivateRoute;