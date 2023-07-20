import React, {createContext, useState} from 'react';

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);

    function toggleAuthStatus() {
        setIsAuth((prevIsAuth) => !prevIsAuth); // Toggle the authentication status
    }

    return (
        <AuthContext.Provider value={{isAuth, toggleAuthStatus}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;