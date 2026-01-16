import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/testdb");

    console.log("connected");
  } catch (e) {}
};

export default db();
