import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Admin from "../models/admin.model";
import  ApiError  from "../utils/api.error";
import { param } from "express-validator";

export const validateId = [
  param("id").isMongoId().withMessage("Invalid ID"),
];
export const validateAdd = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("email").trim().notEmpty().withMessage("email is required")
               .isEmail().withMessage("Invalid email format"),  
  body("author").trim().notEmpty().withMessage("Author Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("published").isBoolean().withMessage("Published is required"),
  body("option_type").trim().notEmpty().withMessage("Option Type is required"),
  body("skills").isArray({ min: 1 }).withMessage("Skills must be array with at least 1 item"),
  body("skills.*").trim().notEmpty().withMessage("Skill items cannot be empty"),
  body("tags").isArray({ min: 1 }).withMessage("Tags must be array with at least 1 item"),
  body("tags.*").trim().notEmpty().withMessage("Tag items cannot be empty"),
];
export const validateEdit = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("email").trim().notEmpty().withMessage("email is required")
              .isEmail().withMessage("Invalid email format"),  
  body("author").trim().notEmpty().withMessage("Author Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("published").isBoolean().withMessage("Published is required"),
  body("option_type").trim().notEmpty().withMessage("Option Type is required"),
  body("skills").isArray({ min: 1 }).withMessage("Skills must be array with at least 1 item"),
  body("skills.*").trim().notEmpty().withMessage("Skill items cannot be empty"),
  body("tags").isArray({ min: 1 }).withMessage("Tags must be array with at least 1 item"),
  body("tags.*").trim().notEmpty().withMessage("Tag items cannot be empty"),
];
export const isRequestValidated = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(errors.array().map(e => e.msg).join(", "),422);            
  }
  next();
};