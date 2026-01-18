import Post from "../models/post.model";
import  IPost  from "../interface/post.interface";

import { Types } from "mongoose";

export class PostService {
  async createPost(data: IPost): Promise<IPost> {
    return Post.create({
      title: data.title,
      email:data.email,
      description: data.description,
      author: data.author,
      published: data.published,
      skills:data.skills
    });
  }

  async getPosts(): Promise<IPost[]> {
    return Post.find();
  }

  async getPost(id: string): Promise<IPost | null> {   
    const post = await Post.findById(id);
    return post;
  }

  async updatePost(id: string, data: Partial<IPost>): Promise<IPost | null> {
    const post = await Post.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });   
    return post;
  }

  // delete post
  async deletePost(id: string): Promise<IPost | null> {
    const post = await Post.findByIdAndDelete(id);
    return post
  }
  async testPost(id: string): Promise<IPost | null> {
    const objectId = new Types.ObjectId(id);
    const data =Post.findOne({"_id":objectId});
    return data;
  }
}

// singleton export
export const postService = new PostService();
