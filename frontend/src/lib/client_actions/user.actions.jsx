import axios from "axios";
import { toast } from "react-toastify";

// login handler
export const login_onSubmit = async (values, { setSubmitting }, navigate) => {
    setSubmitting(true);
    toast.info("Logging In!");
    // console.log(values);
    try {

    } catch (error) {
        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Login failed. Please check your credentials."
        );
    } finally {
        setSubmitting(false);
    }
};

// Signup handler
export const signup_onSubmit = async (values, { setSubmitting }, navigate) => {
    setSubmitting(true);
    toast.info("Signing Up!");
    try {

    } catch (error) {
        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Sign up failed. Please try again."
        );
    } finally {
        setSubmitting(false);
    }
};

// Google login handler
export const handleGoogleLogin = () => {
    toast.info("Redirecting to Register via Google");
};

// Apple login handler
export const handleAppleLogin = () => {
    toast.info("Redirecting to Register via Apple");
};

// Toggle password visibility
export const togglePasswordVisibility = (setPasswordVisible) => {
    setPasswordVisible((prev) => !prev);
};
