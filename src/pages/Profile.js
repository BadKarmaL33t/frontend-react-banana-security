import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = useContext(AuthContext);
    const [privateContent, setPrivateContent] = useState({title: null, content: null});

    useEffect(() => {
        const token = localStorage.getItem("token");

        getPrivateContent(token);
    }, []);

    async function getPrivateContent(token) {
        const controller = new AbortController();

        try {
            const result = await axios.get(`http://localhost:3000/660/private-content`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                signal: controller.signal,
            });
            setPrivateContent(result.data);
        } catch (error) {
            console.error(error);
        }
        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam: </strong>{user.username}</p>
                <p><strong>Email: </strong>{user.email}</p>
            </section>
            {Object.keys(privateContent).length > 0 &&
                <section>
                    <h2>{privateContent.title}</h2>
                    <p>{privateContent.content}</p>
                </section>
            }
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;