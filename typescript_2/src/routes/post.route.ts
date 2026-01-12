//importing modules
import express from "express";
import { PostController } from '../controllers/post.controller'
import { validateAdd, isRequestValidated } from '../validations/post.validations'
const router = express.Router()

router.post('/',validateAdd,isRequestValidated,PostController.addpost)
router.get('/', PostController.getPosts)
router.get('/:id', PostController.getAPost)
router.put('/:id', PostController.updatePost)
router.delete('/:id', PostController.deletePost)

export default router;