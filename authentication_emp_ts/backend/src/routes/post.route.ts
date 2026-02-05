import express from "express";
import { postController } from '../controllers/post.controller'
import { validateAdd, isRequestValidated,validateEdit } from '../validations/post.validations'
const postRouter = express.Router()
import authentication from "../middleware/auth.middleware"
postRouter.post('/',authentication,validateAdd,isRequestValidated, postController.addPost)
postRouter.get('/',authentication,postController.getPosts)
postRouter.get('/:id', postController.getPost)
postRouter.put('/:id', validateEdit, isRequestValidated, postController.updatePost)
postRouter.delete('/:id', postController.deletePost)
postRouter.post('/test', postController.testPost)


export default postRouter;