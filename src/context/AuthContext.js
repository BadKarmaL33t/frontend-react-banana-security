import React, {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState({isAuth: false, user: {}, status: "pending"});
    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwt_decode(token);
            getUserDetails(decoded.sub, token);
            console.log("Gebruiker is herkend en opnieuw ingelogd!");
        } else {
            setIsAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    }, []);

    function signIn(accessToken) {
        localStorage.setItem("token", accessToken);
        const decoded = jwt_decode(accessToken);
        getUserDetails(decoded.sub, accessToken, "/profile");
        console.log("Gebruiker is ingelogd!");
    }

    function signOut() {
        localStorage.clear();
        setIsAuth({
            isAuth: false,
            user: null,
            status: "done"
        });
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    async function getUserDetails(id, token, navUrl) {
        try {
            const userDetails = await axios.get(`http://localhost:3000/600/users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
            });
            setIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: userDetails.data.username,
                    email: userDetails.data.email,
                    id: userDetails.data.id,
                },
                status: "done"
            });
            if (navUrl) {
                navigate(navUrl);
            }
        } catch (error) {
            setIsAuth({
                isAuth: false,
                user: null,
                status: "done"
            });
            console.error(error);
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        signIn: signIn,
        signOut: signOut,
    };

    return (
        <AuthContext.Provider value={contextData}>
            { isAuth.status === "done" ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;