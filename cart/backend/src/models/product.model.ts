import  {Schema, model,} from 'mongoose'
import  IProduct  from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    qty: {
        type: Number,
    },
    
})
 const Product = model<IProduct>('Product', productSchema )
 export default Product