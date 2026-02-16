import  {Schema, model,} from 'mongoose'
import  IAdmin  from "../interfaces/admin.interface";

const adminSchema = new Schema<IAdmin>({
    title: {
        type: String,
    },
    email: {
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
    option_type: {
        type: String,
    },
    skills :[String],
    tags:[String],
    createdAt: {
        type: Date,
        default: Date.now
}
//, { timestamps: true });
})
 const Admin = model<IAdmin>('Admin', adminSchema )
 export default Admin