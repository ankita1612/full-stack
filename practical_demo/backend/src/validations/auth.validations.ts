import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import  ApiError  from "../utils/api.error";

export const validateRegister = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email").trim().notEmpty().withMessage("email is required")
               .isEmail().withMessage("Invalid email format"),
  body("password").trim().notEmpty().withMessage("password is required"),
   body("confirmPassword")
      .notEmpty().withMessage("Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  body("DOB").notEmpty().withMessage("DOB is required"),
  body("status").trim().notEmpty().withMessage("status is required"),
  body("profile_image").optional()
];
export const validateLogin = [  
  body("email").notEmpty().withMessage("email is required")
               .isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required")
];
export const isRequestValidated = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(errors.array()[0].msg, 422);             
  }
  next();
};