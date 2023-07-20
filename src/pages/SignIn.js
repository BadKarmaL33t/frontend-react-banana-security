import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const authContext = useContext(AuthContext); // Gebruik de useContext-hook om de context uit te lezen

    const signInHandler = () => {
        authContext.signIn();
    };

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form>
        <p>*invoervelden*</p>
        <button
            type="submit"
            onClick={signInHandler}
        >
            Inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;