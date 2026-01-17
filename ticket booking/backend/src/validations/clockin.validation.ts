import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const addClockin = [
  body('emp_id').notEmpty().withMessage("employee_id is required"),
  body('clockin').notEmpty().withMessage("clockin is required"),
  body('clockout').notEmpty().withMessage("clockout is required"),
  body('entry_date').notEmpty().withMessage("entry_date is required")
]

export const isRequestValidated = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({success:false, message: errors.array()[0].msg,data:[] });
    return; 
  }
  next();
};
