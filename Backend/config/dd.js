import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("mogodb connected");
  } catch (error) {
    console.log("connection faild");
  }
};

export default connectDb;
