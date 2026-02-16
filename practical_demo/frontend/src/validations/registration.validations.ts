import * as yup from "yup";
import apiClient from "../utils/apiClient";

const registrationValidate = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"), 
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .test(
      "checkEmailExists",
      "Email already registered",
      async (value) => {
        if (!value) return false;

        try {
          const { data } = await apiClient.get(
            `/api/auth/check-email`,
            { params: { email: value } }
          );

          return !data.exists; // true = valid
        } catch (error) {
          return false; // if API fails, mark invalid
        }
      }
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain one uppercase letter")
    .matches(/[a-z]/, "Must contain one lowercase letter")
    .matches(/[0-9]/, "Must contain one number")
    .matches(/[@$!%*?&]/, "Must contain one special character"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  DOB: yup
    .date()
    .typeError("Date of Birth is required")
    .required("Date of Birth is required")
    .max(new Date(), "DOB cannot be in the future"),
});

export default registrationValidate;