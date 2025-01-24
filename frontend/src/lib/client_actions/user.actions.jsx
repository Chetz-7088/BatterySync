import { toast } from "react-toastify";

function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// login handler
export const login_onSubmit = async (values, { setSubmitting }, navigate) => {
    setSubmitting(true);
    toast.info("Logging In!");
    console.log(values);
    try {
        await pause(3000);
        navigate('/');
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
        await pause(3000);
        navigate('/login');
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
export const handleGoogleLogin = async (setSubmitting, navigate) => {
    setSubmitting(true);
    toast.info("Redirecting to Register via Google");
    try {
        await pause(3000);
    } catch (error) {
        toast.error(
            error.response?.data?.message || error.message || "Something went wrong. Please try again."
        );
    } finally {
        setSubmitting(false);
    }
};

// Apple login handler
export const handleAppleLogin = async (setSubmitting, navigate) => {
    setSubmitting(true);
    toast.info("Redirecting to Register via Apple");
    try {
        await pause(3000);
    } catch (error) {
        toast.error(
            error.response?.data?.message || error.message || "Something went wrong. Please try again."
        );
    } finally {
        setSubmitting(false);
    }
};

// Toggle password visibility
export const togglePasswordVisibility = (setPasswordVisible) => {
    setPasswordVisible((prev) => !prev);
};

// Forget Password handler
export const forgetPass_onSubmit = async (values, { setSubmitting }, navigate) => {
    setSubmitting(true);
    toast.info("Sending OTP!");
    try {
        await pause(3000);
        navigate('/verifyotp')
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

// Verify otp handler
export const otp_handleSubmit = async (values, { setSubmitting }, navigate) => {
    setSubmitting(true);
    toast.info("Verifying OTP");
    const otp = values.otp.join("");
    try {
        console.log(otp);
        await pause(3000);
        // const response = await axios.post("/api/verify-otp", { otp });
        // if (response.data.success) {
        //     navigate("/success");
        // } else {
        //     actions.setFieldError("otp", "Invalid OTP. Please try again.");
        // }
        navigate('/updatePassword')
    } catch (error) {
        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again."
        );
    } finally {
        setSubmitting(false);
    }
};

// Update Password Handler
export const UpdatePass_Handler = async (values, { setSubmitting }, navigate) => {
    setSubmitting(true);
    toast.info("Updating Password");
    console.log(values);
    try {
        await pause(3000);
        navigate('/login');
    } catch (error) {
        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again."
        );
    } finally {
        setSubmitting(false);
    }
};