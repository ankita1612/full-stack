import express from "express";
import { PostController } from "../controllers/post.controller"

export const postRouter = express.Router()

postRouter.post('/',PostController.addpost)
postRouter.get('/', PostController.getPosts)
postRouter.get('/:id', PostController.getAPost)
postRouter.put('/:id', PostController.updatePost)
postRouter.delete('/:id', PostController.deletePost)

export default postRouter