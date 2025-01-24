import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import "./authentication.css";
import { FaKey } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {
    updatePass_initialValues,
    updatePass_validationSchema,
} from "../../lib/server_actions/utils";
import InputField from "../ui/InputField";
import {
    togglePasswordVisibility,
    UpdatePass_Handler,
} from "../../lib/client_actions/user.actions";
import { GrUpdate } from "react-icons/gr";
import PageTransitionWrapper from "../../PageTransitionWrapper";

const UpdatePass = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log(isSubmitting);

    return (
        <PageTransitionWrapper>
            <div className="auth-center">
                <div className="glass-form">
                    <h2>
                        <GrUpdate className="login-icon" /> Update Password
                    </h2>

                    <Formik
                        initialValues={updatePass_initialValues}
                        validationSchema={updatePass_validationSchema}
                        onSubmit={async (values, actions) => {
                            setIsSubmitting(true);
                            await UpdatePass_Handler(values, actions, navigate);
                            setIsSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, isValid, dirty, setSubmitting }) => (
                            <Form>
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
                                    {isSubmitting ? "Updating Password..." : "Update Password"}{" "}
                                    <MdOutlineArrowForwardIos />
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </PageTransitionWrapper>
    );
};

export default UpdatePass;
