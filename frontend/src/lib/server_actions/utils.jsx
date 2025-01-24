import * as Yup from "yup";

// Sign Up page
export const signup_initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  batteryType: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const signup_validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  batteryType: Yup.string().required("Battery type is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  phone: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Password is required"),
});

// login page
export const login_initialValues = {
  email: "",
  password: "",
};

export const login_validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

// forget password page
export const forgetPass_initialValues = {
  email: "",
};

export const forgetPass_validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

// verify otp page
export const otp_initialValues = {

  otp: ["", "", "", "", "", ""],
};

export const otpSchema = Yup.object().shape({
  otp: Yup.array()
    .of(Yup.string().matches(/^[0-9]$/, "Must be a single digit"))
    .min(6, "OTP must have 6 digits")
    .max(6, "OTP must have 6 digits"),
});

// Update Password page
export const updatePass_initialValues = {
  password: "",
  confirmPassword: "",
};

export const updatePass_validationSchema = Yup.object({
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Password is required"),
});