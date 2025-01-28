import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaFingerprint } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./authentication.css";
import { otp_initialValues, otpSchema } from "../../lib/server_actions/utils";
import { getRemainingTimeToResend, otp_handleSubmit, resendOtp } from "../../lib/client_actions/user.actions";
import PageTransitionWrapper from "../../PageTransitionWrapper";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const purpose = location.state?.purpose; // 'emailVerification' or 'forgotPassword'

  const [remainingTime, setRemainingTime] = useState(getRemainingTimeToResend());
  const [isResendAllowed, setIsResendAllowed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemainingTimeToResend();
      setRemainingTime(remaining);

      if (remaining === 0) {
        setIsResendAllowed(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendOtp = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/forgetPass");
        throw new Error("Authentication timeout. Please re-enter email id");
      }
      await resendOtp(email);
      setIsResendAllowed(false);
      setRemainingTime(getRemainingTimeToResend()); // Reset timer state
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  return (
    <PageTransitionWrapper>
      <div className="auth-center">
        <div className="glass-form">
          <h2>
            <FaFingerprint className="login-icon" />{" "}
            {purpose === "forgotPassword" ? "Reset Password" : "Verify Email ID"}
          </h2>
          <p style={{ color: "#b9b9b9", marginTop: "-10px" }}>
            {purpose === "forgotPassword"
              ? "Enter the 6-digit OTP sent to your email to reset your password."
              : "Enter the 6-digit OTP sent to your email for verification."}
          </p>

          <Formik
            initialValues={otp_initialValues}
            validationSchema={otpSchema}
            onSubmit={(values, actions) => otp_handleSubmit(values, actions, navigate, purpose)}
          >
            {({ values, isSubmitting, setFieldValue, isValid, dirty }) => (
              <Form>
                <div className="otp-container">
                  {values.otp.map((_, index) => (
                    <Field
                      key={index}
                      name={`otp[${index}]`}
                      validate={(value) =>
                        /^[0-9]$/.test(value) || value === "" ? undefined : "Must be a digit"
                      }
                    >
                      {({ field }) => (
                        <input
                          {...field}
                          type="text"
                          maxLength="1"
                          className="otp-input"
                          autoFocus={index === 0}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[0-9]$/.test(value) || value === "") {
                              setFieldValue(`otp[${index}]`, value);
                              if (value && index < 5) {
                                document.getElementById(`otp-${index + 1}`).focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Backspace" &&
                              !values.otp[index] &&
                              index > 0
                            ) {
                              document.getElementById(`otp-${index - 1}`).focus();
                            }
                          }}
                          id={`otp-${index}`}
                        />
                      )}
                    </Field>
                  ))}
                </div>
                <ErrorMessage name="otp" component="div" className="error-message" />

                {remainingTime > 0 ? (
                  <Countdown
                    date={Date.now() + remainingTime}
                    renderer={({ minutes, seconds }) => (
                      <div className="otp-countdown">
                        {String(minutes).padStart(2, "0")}:
                        {String(seconds).padStart(2, "0")}
                      </div>
                    )}
                  />
                ) : (
                  isResendAllowed && (
                    <button
                      type="button"
                      className="resend-button"
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  )
                )}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={
                    isSubmitting ||
                    !dirty ||
                    !isValid ||
                    values.otp.includes("")
                  }
                >
                  {isSubmitting ? "Verifying OTP..." : "Verify OTP"}{" "}
                  <MdOutlineArrowForwardIos />
                </button>
              </Form>
            )}
          </Formik>

          <p className="signup-link">
            Incorrect Email ID? <Link to="/forgetPass">Re-enter email id</Link>
          </p>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default VerifyOtp;
