import React, {useEffect, useState} from 'react';

function PasswordInput({label, labelText, name, register, errors, customValidateParams}) {
    const [passwordStrength, setPasswordStrength] = useState("");

    useEffect(() => {
        register(name);
    }, [name, register, errors]);

    function passwordStrengthChecker(v) {
        const strongRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{12,})/;
        const mediumRegex = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

        if (strongRegex.test(v)) {
            return 'Strong';
        } else if (mediumRegex.test(v)) {
            return 'Medium';
        } else {
            return 'Weak';
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
            matchPattern: (v) => {
                if (!/(?=.{10,})/.test(v)) return "Make sure the password is at least 10 characters long";
                if (!/(?=.*[A-Z])/.test(v)) return "Make sure the password has at least one uppercase letter";
                if (!/(?=.*[a-z])/.test(v)) return "Make sure the password has at least one lowercase letter";
                if (!/(?=.*[0-9])/.test(v)) return "Make sure the password has at least one digit";
                if (!/[^A-Za-z0-9]/.test(v)) return "Make sure the password has at least one special character";
                return true;
            }
        }
    };

    if (customValidateParams) {
        validationParams.validate = customValidateParams;
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
            <span id="strengthDisp" className="badge badge__displayBadge">{passwordStrength}</span>
            {errors[name] && <small>{errors[name].message}</small>}
        </>
    );
}

export default PasswordInput;