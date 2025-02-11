// import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import "./authentication.css";
import { FaEnvelope } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import InputField from "../ui/InputField";
import {
    forgetPass_initialValues,
    forgetPass_validationSchema,
} from "../../lib/server_actions/utils";
import { forgetPass_onSubmit } from "../../lib/client_actions/user.actions";
import PageTransitionWrapper from "../../PageTransitionWrapper";

const ForgetPass = () => {
    const navigate = useNavigate();

    return (
        <PageTransitionWrapper>
            <div className="auth-center">
                <div className="glass-form">
                    <h2>
                        <IoIosLogIn className="login-icon" /> Forget Password?
                    </h2>
                    <p style={{ color: "#b9b9b9", "marginTop": "-10px" }}>
                        Enter your registered email id where you will receive a 6 digit OTP.
                    </p>

                    <Formik
                        initialValues={forgetPass_initialValues}
                        validationSchema={forgetPass_validationSchema}
                        onSubmit={(values, actions) =>
                            forgetPass_onSubmit(values, actions, navigate)
                        }
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    icon={<FaEnvelope />}
                                />
                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending OTP..." : "Receive OTP"}{" "}
                                    <MdOutlineArrowForwardIos />
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <p className="signup-link">
                        Back to Log-In? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </PageTransitionWrapper>
    );
};

export default ForgetPass;
