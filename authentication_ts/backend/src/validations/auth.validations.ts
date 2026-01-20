import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const registration = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").notEmpty().withMessage("email is required")
               .isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
  body("DOB").notEmpty().withMessage("DOB is required"),
  body("status").notEmpty().withMessage("status is required"),
  body("profile_image").optional()
];
export const login = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("email is required")
               .isEmail().withMessage("Invalid email format")
];
export const isRequestValidated = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({success:false, message: errors.array()[0].msg,data:[] });
    return; 
  }
  next();
};
