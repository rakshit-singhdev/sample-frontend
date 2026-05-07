import React from 'react';
import { Navigate, Outlet } from 'react-router';


const ProtectedRoute = () => {
    const accessToken = localStorage.getItem('accessToken');

    return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;