import express from "express";
import { postController } from '../controllers/product.controller'
//import { validateAdd, isRequestValidated,validateEdit } from '../validations/post.validations'
const postRouter = express.Router()

//postRouter.post('/',validateAdd,isRequestValidated, postController.addPost)
postRouter.get('/',postController.getPosts)
// postRouter.get('/:id', postController.getPost)
// postRouter.put('/:id', validateEdit, isRequestValidated, postController.updatePost)
// postRouter.delete('/:id', postController.deletePost)
// postRouter.post('/test', postController.testPost)


export default postRouter;