import React, {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState({isAuth: false, user: ""});
    const navigate = useNavigate();

    function signIn(email) {
        setIsAuth({isAuth: true, user: email.value})
        console.log(`Gebruiker is ingelogd!`)
        navigate('/profile')
    }

    function signOut() {
        setIsAuth({isAuth: false, user: ""})
        console.log(`Gebruiker is uitgelogd!`)
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{
            isAuth: isAuth.isAuth, // Accessing the isAuth property correctly
            user: isAuth.user, // Accessing the user property correctly
            signIn,
            signOut
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;