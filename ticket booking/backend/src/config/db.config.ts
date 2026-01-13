import mongoose from 'mongoose'
const conn_url=process.env.MONGO_URL  ||"mongodb://localhost:27017/ticket";
const dbConnect = async()=>{
    try{
        await mongoose.connect(conn_url)    
    } 
    catch (error ) {
        console.error(error);
        process.exit(1); // Exit process with failure
  }
}

export default dbConnect