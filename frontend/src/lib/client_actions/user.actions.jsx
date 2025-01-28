import { toast } from "react-toastify";
import apis from "../../utils/apis";

function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// login handler
export const login_onSubmit = async (values, { setSubmitting }, navigate) => {
    setSubmitting(true);
    toast.dismiss();
    toast.info("Logging In!");

    try {
        const { email, password } = values;
        const json = JSON.stringify({ email, password });

        const response = await fetch(apis().loginUser,
            {
                method: 'POST',
                body: json,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        if (!response.ok) {
            const errorResult = await response.json();
            const errorMessage = errorResult?.message || response.statusText || 'LogIn failed';
            throw new Error(`Error: ${errorMessage}`);
        }

        const result = await response.json();

        if (result.status === true) {
            toast.dismiss();
            toast.success("Log In Successful!");
            const { token, user } = result;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        }
    } catch (error) {
        toast.dismiss();
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
    toast.dismiss();
    toast.info("Signing Up!");

    try {
        const { firstName, lastName, username, email, batteryType, address, city, state, country, phone, password } = values;
        const json = JSON.stringify({ firstName, lastName, username, email, batteryType, address, city, state, country, phone, password });

        console.log("Fetching API");
        const response = await fetch(apis().registerUser,
            {
                method: 'POST',
                body: json,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        console.log("Response = ", response);

        if (!response.ok) {
            const errorResult = await response.json();
            const errorMessage = errorResult?.message || response.statusText || 'Sign up failed';
            throw new Error(`Error: ${errorMessage}`);
        }

        const result = await response.json();
        // console.log("result =", result);

        if (result.status === true) {
            toast.dismiss();
            toast.success("Sign Up Successful!");
            navigate('/login');
        }
    } catch (error) {
        toast.dismiss();
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
    toast.dismiss();
    toast.info("Redirecting to Register via Google");
    try {
        await pause(3000);
    } catch (error) {
        toast.dismiss();
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
    toast.dismiss();
    toast.info("Redirecting to Register via Apple");
    try {
        await pause(3000);
    } catch (error) {
        toast.dismiss();
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
    toast.dismiss();
    toast.info("Sending OTP!");

    try {
        const { email } = values;
        const json = JSON.stringify({ email });

        const response = await fetch(apis().forgetPass,
            {
                method: 'POST',
                body: json,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        const result = await response.json();

        if (!response.ok) {
            // Handling multiple OTP requests
            if (response.status === 429) {
                navigate('/verifyotp');
            }

            const errorMessage = result?.message || response.statusText || 'Failed to process the Forget Password Request';
            throw new Error(`Error: ${errorMessage}`);
        }

        const { message, status, token, resendPermission } = result;
        if (status === true) {
            toast.dismiss();
            toast.success(message);
            localStorage.setItem('email', email);
            localStorage.setItem('token', token);
            localStorage.setItem('resendPermission', resendPermission);

            navigate('/verifyOtp', { state: { purpose: 'forgotPassword' } });
        }
    } catch (error) {
        toast.dismiss();
        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Forget Password Request failed to process. Please try again."
        );
    } finally {
        setSubmitting(false);
    }
};

/// OTP submit handler
export const otp_handleSubmit = async (values, { setSubmitting }, navigate, purpose) => {
    setSubmitting(true);
    toast.dismiss();
    toast.info("Verifying OTP");
    const otp = values.otp.join("");

    try {
        // Retrieve data from local storage
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        const requestBody = { email, otp, token };

        const response = await fetch(apis().verifyOtp, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage =
                result?.message || response.statusText || "Failed to process the OTP request";
            throw new Error(`Error: ${errorMessage}`);
        }

        const { message, status } = result;
        if (status === true) {
            toast.dismiss();
            toast.success(message);

            // Redirect based on purpose
            if (purpose === "forgotPassword") {
                navigate("/updatePass");
            } else if (purpose === "emailVerification") {
                navigate("/");
            }
        }

    } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again."
        );
    } finally {
        setSubmitting(false);
    }
};

export const getRemainingTimeToResend = () => {
    try {
        const resendTimestamp = localStorage.getItem("resendPermission");
        if (!resendTimestamp) {
            throw new Error("Authentication time out. Please re-enter email id.");
        }

        const currentTime = new Date().getTime();
        const remainingTime = resendTimestamp - currentTime;

        return remainingTime > 0 ? remainingTime : 0;
    } catch (error) {
        console.error("Error in getRemainingTimeToResend:", error);
        return 0;
    }
};

export const resendOtp = async (email) => {
    toast.dismiss();
    toast.info("Resending OTP");

    try {
        if (!email) {
            throw new Error("Authentication time out. Please re-enter email id.");
        }

        const json = JSON.stringify({ email });
        const response = await fetch(apis().forgetPass, {
            method: "POST",
            body: json,
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("Too many requests. Please try again later.");
            }

            const errorMessage = result?.message || response.statusText || "Failed to process the Forget Password Request";
            throw new Error(`Error: ${errorMessage}`);
        }

        const { message, status, token, resendPermission } = result;
        if (status === true) {
            toast.dismiss();
            toast.success(message);
            localStorage.setItem("email", email);
            localStorage.setItem("token", token);
            localStorage.setItem("resendPermission", resendPermission);
        }
    } catch (error) {
        console.error("Error in resendOtp:", error);
        toast.error(`An error occurred: ${error.message || error}`);
    }
};

// Update Password Handler
export const UpdatePass_Handler = async (values, { setSubmitting }, navigate) => {
    setSubmitting(true);
    toast.dismiss();
    toast.info("Updating Password");

    try {
        // Retrieve data from local storage
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        const { password, confirmPassword } = values;
        const requestBody = { email, token, password };

        if (password !== confirmPassword) {
            throw new Error("Password did not match");
        }

        const response = await fetch(apis().updatePass, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json', },
        });
        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result?.message || response.statusText || 'Failed to Update Password';
            throw new Error(`Error: ${errorMessage}`);
        }

        const { message, status } = result;
        if (status === true) {
            toast.dismiss();
            toast.success(message);
            navigate('/login')
        }
    } catch (error) {
        toast.dismiss();
        toast.error(
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again."
        );
    } finally {
        setSubmitting(false);
    }
};