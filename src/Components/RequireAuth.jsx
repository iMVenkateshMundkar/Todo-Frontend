import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const location = useLocation();
    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}

export default RequireAuth