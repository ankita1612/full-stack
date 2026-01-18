import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from '../interface/post.interface';

export interface PostDocument extends IPost, Document {}

const postSchema = new Schema<PostDocument>({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const Post = mongoose.model<PostDocument>('Post', postSchema);
