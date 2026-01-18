import { Request, Response } from 'express';
import { postService } from '../services/post.service';

export class PostController {
  async create(req: Request, res: Response) {
    try {
      const post = await postService.createPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create post' });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const posts = await postService.getPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch posts' });
    }
  }

  async getById(req: Request<{id: string}>, res: Response) {
    try {
      const id=req.params.id;
      const post = await postService.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch post' });
    }
  }

  async update(req: Request<{id: string}>, res: Response) {
    try {
      const id = req.params.id
      const post = await postService.updatePost(id, req.body);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update post' });
    }
  }

  async delete(req: Request<{id: string}>, res: Response) {
    try {
         const id = req.params.id
      const post = await postService.deletePost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete post' });
    }
  }
}

export const postController = new PostController();
