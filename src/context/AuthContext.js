import React, {createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    function signIn() {
        setIsAuth(true)
        console.log("Gebruiker is ingelogd!")
        navigate('/profile')
    }

    function signOut() {
        setIsAuth(false)
        console.log("Gebruiker is uitgelogd!")
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{
            isAuth, signIn, signOut
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;