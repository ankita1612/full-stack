import  mongoose from 'mongoose';
const DB_URI = process.env.DB_NAME;
if (!DB_URI) {
  throw new Error("DB_NAME is not defined in environment variables");
}

const connectDB =  async() => {
    mongoose.connect(DB_URI);
}
export default connectDB;