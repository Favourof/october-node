import { body } from "express-validator";

export const registerSchema = [
  body("firstName")
    .isString()
    .withMessage("FirstName must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "FirstName can not be lesser than 3 character and be greater than 30 character",
    ),
  body("lastName")
    .isString()
    .withMessage("lastName must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "lastName can not be lesser than 3 character and be greater than 30 character",
    ),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("must be a valide email"),
  body("password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be 6+ chars with at least 1 lowercase, 1 uppercase, 1 number",
    ),
];


export const loginSchema = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("must be a valide email"),
  body("password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be 6+ chars with at least 1 lowercase, 1 uppercase, 1 number",
    ),
];