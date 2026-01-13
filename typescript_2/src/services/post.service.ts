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

  async getPost(id: string): Promise<IPost> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid post id");
    }

    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  // update post
  async updatePost(id: string, data: Partial<IPost>): Promise<IPost> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid post id");
    }

    const post = await Post.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  // delete post
  async deletePost(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid post id");
    }

    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      throw new Error("Post not found");
    }
  }
  async testPost(id: string): Promise<IPost | null> {
    const objectId = new Types.ObjectId(id);
    const data =Post.findOne({"_id":objectId});
    return data;
  }
}

// singleton export
export const postServices = new PostService();
