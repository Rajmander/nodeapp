import { body } from "express-validator";

export const createUserValidator = [
  body("username").trim().notEmpty().withMessage("Username is required").bail(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password is required"),
  body("mobile").notEmpty().withMessage("Mobile is required"),
];
