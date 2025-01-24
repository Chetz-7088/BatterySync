import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import "./authentication.css";
import {
  FaEnvelope,
  FaKey,
  FaGoogle,
  FaApple,
} from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import InputField from "../ui/InputField";
import {
  login_initialValues,
  login_validationSchema,
} from "../../lib/server_actions/utils";
import {
  handleAppleLogin,
  handleGoogleLogin,
  login_onSubmit,
  togglePasswordVisibility,
} from "../../lib/client_actions/user.actions";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div>
      <div className="auth-right">
        <div className="glass-form">
          <h2>
            <IoIosLogIn className="login-icon" /> Login Now
          </h2>

          <Formik
            initialValues={login_initialValues}
            validationSchema={login_validationSchema}
            onSubmit={(values, actions) =>
              login_onSubmit(values, actions, navigate)
            }
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Social login buttons */}
                <div className="social-buttons">
                  <button
                    className="social-button google-button"
                    onClick={handleGoogleLogin}
                    disabled={isSubmitting}
                  >
                    <FaGoogle /> <span>Google</span>
                  </button>
                  <button
                    className="social-button apple-button"
                    onClick={handleAppleLogin}
                    disabled={isSubmitting}
                  >
                    <FaApple /> <span>Apple</span>
                  </button>
                </div>

                {/* Division */}
                <div className="or-line">
                  <span>or</span>
                </div>

                {/* Form */}
                {/* Email */}
                <InputField
                  type="email"
                  name="email"
                  placeholder="Email"
                  icon={<FaEnvelope />}
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
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging In..." : "Login"}{" "}
                  <MdOutlineArrowForwardIos />
                </button>
              </Form>
            )}
          </Formik>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
