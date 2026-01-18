//import modules
import { postService } from '../services/post.service'
import { Request, Response } from 'express'

class postController {
    //add post controller
    addpost = async (req: Request, res: Response) => {
        //data to be saved in database
        const data = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            published: req.body.published
        }    
        //call the create post function in the service and pass the data from the request
        const post = await postService.createPost(data)
        res.status(201).send(post)          
        
        
    }

    //get all posts
    getPosts = async (req: Request, res: Response) => {
        const posts = await postService.getPosts()
        res.send(posts)
    }


    //get a single post
    getAPost = async (req: Request<{id: string}>, res: Response) => {
        //get id from the parameter
        const id = req.params.id 
        const post = await postService.getPost(id)
        res.send(post)
    }

    //update post
    updatePost = async (req: Request<{id: string}>, res: Response) => {
       const id = req.params.id
       const post = await postService.updatePost(id, req.body)  
       if (!post) {
            return res.status(404).json({ message: 'Post not found' });
       }
       res.send(post)
    }
    
    //delete a post
    deletePost = async (req: Request<{id: string}>, res: Response) => {
        try {
            const deleted = await postService.deletePost(req.params.id);

            if (!deleted) {
            return res.status(404).json({ message: 'Post not found' });
            }

            return res.status(200).json({ message: 'Post deleted' });
        } catch (error) {
            return res.status(400).json({ message: 'Invalid post id' });
        }
    }
}

//export class
export const PostController = new postController()