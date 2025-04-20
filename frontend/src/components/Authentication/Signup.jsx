import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./authentication.css";
import {
    FaEnvelope,
    FaUser,
    FaLocationArrow,
    FaPhone,
    FaKey,
    FaBatteryHalf,
    FaGoogle,
    FaApple,
} from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {
    signup_initialValues,
    signup_validationSchema,
} from "../../lib/server_actions/utils";
import InputField from "../ui/InputField";
import {
    handleAppleLogin,
    handleGoogleLogin,
    signup_onSubmit,
    togglePasswordVisibility,
} from "../../lib/client_actions/user.actions";
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [socialLoginDisabled, setSocialLoginDisabled] = useState(false);
    console.log(isSubmitting);

    const handleSocialLogin = async (platform, setSubmitting) => {
        setSocialLoginDisabled(true);
        setIsSubmitting(true);

        try {
            if (platform === "google") {
                await handleGoogleLogin(setSubmitting, navigate);
            } else if (platform === "apple") {
                await handleAppleLogin(setSubmitting, navigate); // Implement Apple login logic
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.message || "An error occurred. Please try again.");
        } finally {
            setSocialLoginDisabled(false);
            setIsSubmitting(false);
        }
    };

    const handlePhoneInput = (e) => {
        const input = e.target.value;
        e.target.value = input.replace(/\D/g, "");
    };

    return (
        <div>
            <div className="auth-right">
                <div className="glass-form">
                    <h2>
                        <IoIosLogIn className="login-icon" /> Register Now
                    </h2>

                    <Formik
                        initialValues={signup_initialValues}
                        validationSchema={signup_validationSchema}
                        onSubmit={async (values, actions) => {
                            setIsSubmitting(true);
                            await signup_onSubmit(values, actions, navigate);
                            setIsSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, isValid, dirty, setSubmitting }) => (
                            <Form>
                                {/* Social login buttons */}
                                <div className="social-buttons">
                                    <button
                                        className="social-button google-button"
                                        onClick={() => handleSocialLogin("google", setSubmitting)}
                                        disabled={isSubmitting || socialLoginDisabled}
                                    >
                                        <FaGoogle /> <span>Google</span>
                                    </button>
                                    <button
                                        className="social-button apple-button"
                                        onClick={() => handleSocialLogin("apple", setSubmitting)}
                                        disabled={isSubmitting || socialLoginDisabled}
                                    >
                                        <FaApple /> <span>Apple</span>
                                    </button>
                                </div>

                                {/* Division */}
                                <div className="or-line">
                                    <span>or</span>
                                </div>

                                {/* Form */}
                                <div className="credentials">
                                    {/* First Name */}
                                    <InputField
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        icon={<FaUser />}
                                    />

                                    {/* Last Name */}
                                    <InputField
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        icon={<FaUser />}
                                    />

                                    {/* Username */}
                                    <InputField
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        icon={<FaUser />}
                                    />

                                    {/* Email */}
                                    <InputField
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        icon={<FaEnvelope />}
                                    />

                                    {/* EV Battery Type */}
                                    <div className="input-label">EV Battery Type:</div>
                                    <div className="input-container">
                                        <div className="input-icon left">
                                            <FaBatteryHalf />
                                        </div>
                                        <Field
                                            as="select"
                                            id="batteryType"
                                            name="batteryType"
                                            className="input-field dropdown"
                                        >
                                            <option value="">Select Battery Type</option>
                                            <option value="Lithium-Ion">Lithium-Ion</option>
                                            <option value="Lead-Acid">Lead-Acid</option>
                                            <option value="Nickel-Metal Hydride">
                                                Nickel-Metal Hydride
                                            </option>
                                        </Field>
                                    </div>
                                    <ErrorMessage
                                        name="batteryType"
                                        component="div"
                                        className="error-message"
                                    />

                                    {/* Address */}
                                    <InputField
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        icon={<FaLocationArrow />}
                                    />

                                    {/* City */}
                                    <InputField
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        icon={<FaLocationArrow />}
                                    />

                                    {/* State */}
                                    <InputField
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        icon={<FaLocationArrow />}
                                    />

                                    {/* Country */}
                                    <InputField
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        icon={<FaLocationArrow />}
                                    />

                                    {/* Phone */}
                                    <InputField
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        icon={<FaPhone />}
                                        onInput={handlePhoneInput}
                                    />

                                    {/* Password */}
                                    <InputField
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        icon={<FaKey />}
                                        passwordVisible={passwordVisible}
                                        togglePasswordVisibility={() =>
                                            togglePasswordVisibility(setPasswordVisible)
                                        }
                                    />

                                    {/* Confirm Password */}
                                    <InputField
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        icon={<FaKey />}
                                        passwordVisible={confirmPasswordVisible}
                                        togglePasswordVisibility={() =>
                                            togglePasswordVisibility(setConfirmPasswordVisible)
                                        }
                                    />

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="submit-button"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Registering..." : "Register Now"}{" "}
                                        <MdOutlineArrowForwardIos />
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <p className="signup-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
