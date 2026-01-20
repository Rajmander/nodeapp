import mongoose from "mongoose";

const db = async () => {
  try {
    //await mongoose.connect("mongodb://localhost:27017/testdb");
    await mongoose.connect(
      "mongodb+srv://rajmanderdev_db_user:f82lMIHkh6Gzp0z7@rajcluster.k52h8mf.mongodb.net/?appName=rajcluster",
    );

    console.log("connected");
  } catch (e) {}
};

export default db();
