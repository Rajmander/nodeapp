import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = async () => {
  try {
    //await mongoose.connect("mongodb://localhost:27017/testdb");
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4pdevjd.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`,
    );

    console.log("connected");
  } catch (e) {
    console.log("not connected", e);
  }
};

export default db();
