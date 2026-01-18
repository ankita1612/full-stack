import  {Schema, model,} from 'mongoose'
import IPosts from '../interface/post.interface'

const postSchema = new Schema<IPosts>({
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
const Post = model<IPosts>('Post', postSchema )
export default Post