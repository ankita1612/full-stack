import  {Schema, model,} from 'mongoose'
import  IPost  from "../interface/post.interface";

const postSchema = new Schema<IPost>({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    author: {
        type: String,
    },
    published: {
        type: Boolean,
        default: false
    },    
})
 const Post = model<IPost>('Post', postSchema )
 export default Post