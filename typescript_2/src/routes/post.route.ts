import express from "express";
import { postController } from '../controllers/post.controller'
import { validateAdd, isRequestValidated,validateEdit } from '../validations/post.validations'
const router = express.Router()

router.post('/',validateAdd,isRequestValidated, postController.addPost)
router.get('/',postController.getPosts)
router.get('/:id', postController.getPost)
router.put('/:id', validateEdit, isRequestValidated, postController.updatePost)
router.delete('/:id', postController.deletePost)
router.post('/test', postController.testPost)


export default router;