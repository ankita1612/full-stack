import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await mongoose.connect(process.env.DB_NAME as string);
});

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.connection.close();
});
