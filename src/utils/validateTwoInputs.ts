import { notify } from "@/utils/notify";

/**
 * Validates if two input values are the same
 * @param value1 - First input value
 * @param value2 - Second input value
 * @param errorMessage - Custom error message (optional)
 * @returns boolean - true if values match, false if they don't
 */
export const validateTwoInputs = (
  value1: string,
  value2: string,
  errorMessage?: string
): boolean => {
  if (value1 !== value2) {
    const defaultMessage = "Values do not match";
    notify.error(errorMessage || defaultMessage);
    return false;
  }
  return true;
};

/**
 * Validates password and confirm password specifically
 * @param password - Password value
 * @param confirmPassword - Confirm password value
 * @returns boolean - true if passwords match, false if they don't
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return validateTwoInputs(
    password,
    confirmPassword,
    "Password and confirm password do not match"
  );
};

/**
 * Validates email and confirm email
 * @param email - Email value
 * @param confirmEmail - Confirm email value
 * @returns boolean - true if emails match, false if they don't
 */
export const validateEmailMatch = (
  email: string,
  confirmEmail: string
): boolean => {
  return validateTwoInputs(
    email,
    confirmEmail,
    "Email and confirm email do not match"
  );
};
