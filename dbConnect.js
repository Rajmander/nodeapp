import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb");

    console.log("connected");
  } catch (e) {}
};

export default db();
