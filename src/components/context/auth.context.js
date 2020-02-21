import React, { useState } from 'react';

const AuthContext = React.createContext({
    isAuth: false,
    login: () => { }
})

const AuthuContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loginHandler = () => {
        setIsAuthenticated(true);
    }
    return (
        <AuthContext.Provider
            value={{ login: loginHandler, isAuth: isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthuContextProvider;