import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";


function SignUp() {
    const {handleSubmit, formState: {errors, isDirty, isValid}, register} = useForm({mode: 'onBlur'});
    const navigate = useNavigate();
    const controller = new AbortController();

    async function handleFormSubmit(data) {
        try {
            await axios.post('http://localhost:3000/register', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                username: data.username,
                signal: controller.signal,
            });
            console.log("Registration successful");
            navigate('/signin');
        } catch (error) {
            console.error(error);
        }
        console.log(data);

        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <TextInput
                    label="firstname-field"
                    labelText="Voornaam:"
                    name="firstName"
                    register={register}
                    errors={errors}
                    customValidateParams={{
                        matchPattern: (v) => /^[a-zA-Z]+$/.test(v) || "dit veld mag geen cijfers bevatten",
                        minLength: (v) => v.length >= 4 || "vul een geldige naam in",
                        maxLength: (v) => v.length <= 25 || "het maximale aantal karakters is bereikt",
                    }}
                />
                <TextInput
                    label="lastname-field"
                    labelText="Achternaam:"
                    name="lastName"
                    register={register}
                    errors={errors}
                    customValidateParams={{
                        matchPattern: (v) => /^[a-zA-Z]+$/.test(v) || "dit veld mag geen cijfers bevatten",
                        minLength: (v) => v.length >= 2 || "vul een geldige naam in",
                        maxLength: (v) => v.length <= 50 || "het maximale aantal karakters is bereikt",
                    }}
                />
                <TextInput
                    label="username-field"
                    labelText="Gebruikersnaam:"
                    name="username"
                    register={register}
                    errors={errors}
                    customValidateParams={{
                        matchPattern: (v) => /^[a-zA-Z]*[a-zA-Z0-9]+$/.test(v) || "dit veld mag geen cijfers bevatten",
                        minLength: (v) => v.length >= 2 || "vul een geldige naam in",
                        maxLength: (v) => v.length <= 50 || "het maximale aantal karakters is bereikt",
                    }}
                />
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
                    id="register-button"
                    disabled={!isDirty || !isValid}
                >
                    Account aanmaken
                </button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;