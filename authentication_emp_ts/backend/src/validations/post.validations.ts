import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Post from "../models/post.model";
import  ApiError  from "../utils/api.error";

export const validateAdd = [
  body("title").notEmpty().withMessage("Title is required"),
  body("email").notEmpty().withMessage("email is required")
               .isEmail().withMessage("Invalid email format"),
  // body("email").notEmpty().withMessage("email is required")
  //              .isEmail().withMessage("Invalid email format")
  //              .custom(async (value) => {
  //               const existingUser = await Post.findOne({ email: value });
  //               if (existingUser) {
  //                 throw new Error("Email already exists");
  //               }
  //               return true;
  //              }),
  body("author").notEmpty().withMessage("Author Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("published").notEmpty().withMessage("Published is required"),
  body("option_type").notEmpty().withMessage("Option Type is required"),
  body("skills")
    .exists({ checkNull: true })
    .withMessage("Skills field is required")
    .isArray({ min: 1 })
    .withMessage("Skills must be an array with only 1 item")
];
export const validateEdit = [
  body("title").notEmpty().withMessage("Title is required"),
  body("email").notEmpty().withMessage("email is required")
              .isEmail().withMessage("Invalid email format"),
  // body("email").notEmpty().withMessage("email is required")
  //              .isEmail().withMessage("Invalid email format")
  //              .custom(async (value, { req }) => {
  //               const id = req?.params?.id;
  //                 const existingUser = await Post.findOne({
  //                   email: value,
  //                   _id: { $ne: id }, 
  //                 });
  //                 if (existingUser) {
  //                   throw new Error("Email already exists");
  //                 }
  //                 return true;
  //               }),
  body("author").notEmpty().withMessage("Author Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("published").notEmpty().withMessage("Published is required"),
  body("option_type").notEmpty().withMessage("Option Type is required"),
  body("skills")
    .exists({ checkNull: true })
    .withMessage("Skills field is required")
    .isArray({ min: 1 })
    .withMessage("Skills must be an array with only 1 item"),
  body("tags")
    .exists({ checkNull: true })
    .withMessage("Tags field is required")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array with only 1 item")
];
export const isRequestValidated = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(errors.array()[0].msg, 422);             
  }
  next();
};
