import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import TextInput from "../components/TextInput";
import {useForm} from "react-hook-form";
import axios from "axios";

function SignIn() {
    const { signIn } = useContext(AuthContext);
    const { handleSubmit, formState: {errors, isDirty, isValid}, register} = useForm({mode: 'onBlur'});
    const [error, toggleError] = useState(false);

    async function signInHandler(data) {
        toggleError(false);

        try {
            const postSignIn = await axios.post('http://localhost:3000/login', {
                email: data.email,
                password: data.password,
            });
            console.log(postSignIn.data);
            signIn(postSignIn.data.accessToken); // JWT token die ik terugkrijg vanuit de console staat onder "accessToken". Deze moet worden meegegeven naar de AuthContext.
        } catch (error) {
            console.error(error);
            toggleError(true);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(signInHandler)}>
                <TextInput
                    label="email-field"
                    labelText="Email:"
                    name="email"
                    register={register}
                    errors={errors}
                    customValidateParams={{
                        matchPattern: (v) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "dit is geen geldig email adres",
                    }}
                />
                <label htmlFor="password-field"></label>
                <input
                    type="password"
                    id="password-field"
                    {...register("password", {
                        required: {
                            value: true,
                            message: 'Dit veld is verplicht'
                        }
                    })}
                />
                {errors.password && <small>{errors.password.message}</small>}
                {error && <small className="wrong-password">De combinatie van emailadres en wachtwoord is onjuist</small>}
                <button
                    type="submit"
                    id="sign-in-button"
                    // disabled={!isDirty || !isValid}
                >
                    Inloggen
                </button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;