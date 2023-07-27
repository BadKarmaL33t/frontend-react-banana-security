import React, {useEffect, useState} from 'react';

function PasswordInput({ label, labelText, name, register, errors }) {
    const [passwordStrength, setPasswordStrength] = useState("");

    useEffect(() => {
        register(name);
    }, [name, register, errors]);

    function passwordStrengthChecker(v) {
        const strongRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{12,})/;
        const mediumRegex = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

        if (strongRegex.test(v)) {
            return "Sterk";
        } else if (mediumRegex.test(v)) {
            return "Gemiddeld";
        } else {
            return "Zwak";
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setPasswordStrength(passwordStrengthChecker(value));
    };

    const validationParams = {
        required: {
            value: true,
            message: 'Dit veld is verplicht',
        },
        validate: {
            matchPattern: (v) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{10,}$/.test(v) || "Password should be at least 10 characters long,\n" +
                "and have at least one uppercase letter,\n" +
                "one lowercase letter,\n" +
                "one digit,\n" +
                "and one special character"
        }
    }

    return (
        <>
            <label htmlFor={label}>{labelText}</label>
            <input
                type="password"
                id={label}
                {...register(name, validationParams)}
                onChange={handleInputChange}
            />
            <p className="strengthCheck">{passwordStrength && <span>{`${passwordStrength} wachtwoord`}</span>}</p>
            {errors[name] && <small>{errors[name].message}</small>}
        </>
    )
}

export default PasswordInput;