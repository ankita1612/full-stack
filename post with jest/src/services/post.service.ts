import { Post } from '../models/post.model';
import { IPost } from '../interface/post.interface';

export class PostService {
  async createPost(data: IPost) {
    return await Post.create(data);
  }

  async getPosts() {
    return await Post.find();
  }

  async getPostById(id: string) {
    return await Post.findById(id);
  }

  async updatePost(id: string, data: Partial<IPost>) {
    return await Post.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePost(id: string) {
    return await Post.findByIdAndDelete(id);
  }
}

export const postService = new PostService();
