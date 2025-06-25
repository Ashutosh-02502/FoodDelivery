import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ashutoshbhardwaj257:1234567890@cluster01.cfwky.mongodb.net/delivery"
  );
  console.log("MongoDB connected");
};
