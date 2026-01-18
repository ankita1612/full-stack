import Post  from '../models/post.model';
import IPosts from '../interface/post.interface';

export class PostService {
  async createPost(data: IPosts): Promise<IPosts> {
    return Post.create(data);
  }

  async getPosts(): Promise<IPosts[] | null> {
    return Post.find({});
  }

  async getPost(id: string): Promise<IPosts | null> {
    return Post.findById(id);
  }

  async updatePost(id: string,data: Partial<IPosts>): Promise<IPosts | null> {
    return Post.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePost(id: string): Promise<IPosts | null> {
    return Post.findByIdAndDelete(id);
  }
}

export const postService = new PostService();
