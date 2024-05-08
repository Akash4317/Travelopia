import React, { useContext, ReactNode } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { auth } = useContext(AuthContext);

    return (
        <div>
            {auth.isAuth ? children : <Navigate to="/login" />}
        </div>
    );
};

export default PrivateRoute;
