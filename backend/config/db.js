import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("db connected");
  } catch (error) {
    console.error("error connecting to db", error);
    process.exit(1);
  }
};

export default connectDB;