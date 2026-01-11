//importing modules
import express from "express";
import { PostController } from '../controllers/post.controller'

const router = express.Router()

router.post('/',PostController.addpost)
router.get('/', PostController.getPosts)
router.get('/:id', PostController.getAPost)
router.put('/:id', PostController.updatePost)
router.delete('/:id', PostController.deletePost)

export default router;