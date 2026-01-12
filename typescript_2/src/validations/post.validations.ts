import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateAdd = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("published").notEmpty().withMessage("Published is required"),
];
export const validateEdit = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("published").notEmpty().withMessage("Published is required"),
];
export const isRequestValidated = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ error: errors.array()[0].msg });
    return; 
  }
  next();
};
