import { Router } from 'express';
import { postController } from '../controllers/post.controller';

const router = Router();

router.post('/', (req, res) => postController.create(req, res));
router.get('/', (req, res) => postController.getAll(req, res));
router.get('/:id', (req, res) => postController.getById(req, res));
router.put('/:id', (req, res) => postController.update(req, res));
router.delete('/:id', (req, res) => postController.delete(req, res));

export default router;
