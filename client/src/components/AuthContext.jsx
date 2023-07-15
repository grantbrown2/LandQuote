import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated by sending a request to the server
        axios
            .get('http://localhost:8000/api/users/self', { withCredentials: true })
            .then(response => {
                setIsAuthenticated(true);
            })
            .catch(error => {
                setIsAuthenticated(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider}