import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import {useForm} from "react-hook-form";
import axios from "axios";

function SignIn() {
    const { signIn } = useContext(AuthContext);
    const { handleSubmit, formState: {errors, isDirty, isValid}, register} = useForm({mode: 'onBlur'});

    async function signInHandler(data) {
        try {
            await axios.post('http://localhost:3000/login', {
                email: data.email,
                password: data.password,
            });
            console.log(data);
            signIn(data);
        } catch (error) {
            console.error(error);
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
                <PasswordInput
                    label="password-field"
                    labelText="Wachtwoord:"
                    name="password"
                    register={register}
                    errors={errors}
                />
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