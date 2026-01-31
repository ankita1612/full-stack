import { Request, Response, NextFunction } from "express";
import { productService } from "../services/product.service";
import  IProduct  from "../interfaces/product.interface";
import { Types } from "mongoose";

class PostController {
  addPost = async (req: Request<{}, {}, IProduct>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post = await productService.createProduct(req.body);
      res.status(201).json({"success":true,"message":"post created successfully","data":post});
    } catch (error) {
      next(error);
    }
  };
  getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {     
      const posts = await productService.getProduct();
      res.status(201).json({"success":true,"message":"","data":posts});
    } catch (error) {
      next(error);
    }
  }; 
}
export const postController = new PostController();