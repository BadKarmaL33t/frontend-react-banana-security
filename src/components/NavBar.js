import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext); // Gebruik de useContext-hook om de context uit te lezen

  const handleLogout = () => {
    authContext.toggleAuthStatus(); // Roep de toggleAuthStatus-functie aan om uit te loggen
  };

  return (
    <nav>
      <Link to="/">
        <span className="logo-container">
          <img src={logo} alt="logo" />
          <h3>Banana Security</h3>
        </span>
      </Link>

      <div>
        {/* Toon verschillende knoppen op basis van de isAuth-status */}
        {authContext['isAuth'] ? (
            <button type="button" onClick={handleLogout}>
              Uitloggen
            </button>
        ) : (
            <>
              <button type="button" onClick={() => navigate('/signin')}>
                Log in
              </button>
              <button type="button" onClick={() => navigate('/signup')}>
                Registreren
              </button>
            </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;