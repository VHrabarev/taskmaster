import { Navigate } from 'react-router-dom';
import React from "react";

interface protectedRouteProps {
    isAllowed: boolean,
    redirectPath: string,
    component: JSX.Element,
};

const ProtectedRoute: React.FC<protectedRouteProps> = function(props) {
    const { isAllowed, redirectPath, component} = props;
    if(isAllowed) {
        return component;
    };
    return <Navigate to={redirectPath} replace />
};

export default ProtectedRoute;