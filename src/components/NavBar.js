import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import {useNavigate, Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
    const navigate = useNavigate();
    const { isAuth, signOut, user } = useContext(AuthContext);

    return (
        <nav>
            <Link to="/">
        <span className="logo-container">
          <img src={logo} alt="logo"/>
          <h3>Banana Security</h3>
        </span>
            </Link>

            <div>
                {/* Toon verschillende knoppen op basis van de isAuth-status */}
                {isAuth ?
                    <div className="user">
                        <h5>{user}</h5>
                        <button type="button" onClick={signOut}>
                            Uitloggen
                        </button>
                    </div>
                    :
                    <>
                        <button type="button" onClick={() => navigate('/signin')}>
                            Log in
                        </button>
                        <button type="button" onClick={() => navigate('/signup')}>
                            Registreren
                        </button>
                    </>
                }
            </div>
        </nav>
    );
}

export default NavBar;