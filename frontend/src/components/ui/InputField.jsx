import React from "react";
import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
    type,
    name,
    placeholder,
    icon,
    passwordVisible = false,
    togglePasswordVisibility = () => { },
    onInput,
}) => {
    return (
        <div className="input-field-container">
            <div className="input-label">{placeholder}</div>
            <div className="input-container">
                {icon && <div className="input-icon left">{icon}</div>}
                <Field
                    type={passwordVisible && type === "password" ? "text" : type}
                    id={name}
                    name={name}
                    placeholder={`Enter your ${placeholder.toLowerCase()}`}
                    className="input-field"
                    onInput={onInput}
                />
                {type === "password" && (
                    <div
                        className="input-icon right password-visibility"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </div>
                )}
            </div>
            <ErrorMessage name={name} component="div" className="error-message" />
        </div>
    );
};

export default InputField;
