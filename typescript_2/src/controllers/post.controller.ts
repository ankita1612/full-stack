import { Request, Response, NextFunction } from "express";
import { postServices } from "../services/post.service";
import  IPost  from "../interface/post.interface";

class PostController {
  addPost = async (req: Request<{}, {}, IPost>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post = await postServices.createPost(req.body);
      res.status(201).json({"success":true,"message":"post created successfully","data":post});
    } catch (error) {
      next(error);
    }
  };

  getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const posts = await postServices.getPosts();
      res.status(200).json({"success":true,"message":"","data":posts});
    } catch (error) {
      next(error);
    }
  };

  getPost = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post = await postServices.getPost(req.params.id);
      res.status(200).json({"success":true,"message":"","data":post});
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req: Request<{ id: string }, {}, Partial<IPost>>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post = await postServices.updatePost(req.params.id, req.body);
      res.status(200).json({"success":true,"message":"Post update successfully","data":post});
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      await postServices.deletePost(req.params.id);
      res.status(204).json({"success":true,"message":"post delete successfully","data":[]});
    } catch (error) {
      next(error);
    }
  };

  testPost= async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await postServices.testPost(req.body.id);
      res.status(201).json({"success":true,"message":"post delete successfully","data":data});
    } catch (error) {
      next(error);
    }
  };
}
export const postController = new PostController();
