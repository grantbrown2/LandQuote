import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from './AuthContext';

const WithAuth = WrappedComponent => {
    const AuthHOC = () => {
        const navigate = useNavigate();
        const { isAuthenticated } = useContext(AuthContext);

        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/');
            }
        }, [isAuthenticated, navigate]);

        return isAuthenticated ? <WrappedComponent /> : null;
    };

    return AuthHOC;
};

export default WithAuth;