import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaFingerprint } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./authentication.css";
import { otp_initialValues, otpSchema } from "../../lib/server_actions/utils";
import { otp_handleSubmit } from "../../lib/client_actions/user.actions";
import PageTransitionWrapper from "../../PageTransitionWrapper";
import Countdown from "react-countdown";

const VerifyOtp = () => {
  const navigate = useNavigate();
  return (
    <PageTransitionWrapper>
      <div className="auth-center">
        <div className="glass-form">
          <h2>
            <FaFingerprint className="login-icon" /> Verify OTP
          </h2>
          <p style={{ color: "#b9b9b9", marginTop: "-10px" }}>
            Enter the 6-digit OTP sent to your email.
          </p>

          <Formik
            initialValues={otp_initialValues}
            validationSchema={otpSchema}
            onSubmit={(values, actions) =>
              otp_handleSubmit(values, actions, navigate)
            }
          >
            {({ values, isSubmitting, setFieldValue, isValid, dirty }) => (
              <Form>
                <div className="otp-container">
                  {values.otp.map((_, index) => (
                    <Field
                      key={index}
                      name={`otp[${index}]`}
                      validate={(value) =>
                        /^[0-9]$/.test(value) || value === ""
                          ? undefined
                          : "Must be a digit"
                      }
                    >
                      {({ field, form }) => (
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
                                // Move focus to next input
                                document
                                  .getElementById(`otp-${index + 1}`)
                                  .focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Backspace" &&
                              !values.otp[index] &&
                              index > 0
                            ) {
                              // Move focus to previous input
                              document
                                .getElementById(`otp-${index - 1}`)
                                .focus();
                            }
                          }}
                          id={`otp-${index}`}
                        />
                      )}
                    </Field>
                  ))}
                </div>
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="error-message"
                />

                <Countdown
                  date={Date.now() + 1 * 60 * 1000} // 1 minute from now
                  renderer={({ minutes, seconds }) => (
                    <div className="otp-countdown">
                      {String(minutes).padStart(2, "0")}:
                      {String(seconds).padStart(2, "0")}
                    </div>
                  )}
                />

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
            Incorrect Email ID?{" "}
            <Link to="/forgetPassword">Re-enter email id</Link>
          </p>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default VerifyOtp;
