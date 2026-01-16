import express from "express";
const app = express();

app.use(express.json());

import dbConnect from "./dbConnect.js";
import bcrypt from "bcrypt";

// IMPORT USER MODEL
import User from "./user.model.js";
import { createUserValidator } from "./validators/user.validator.js";
import { validate } from "./middlewares/validation.js";

app.post("/users", createUserValidator, validate, async (req, res, next) => {
  const { username, email, password, mobile } = req.body;
  try {
    const exists = await User.countDocuments({
      $or: [{ username }, { email }, { mobile }],
    });

    if (exists > 0) {
      return res.json({
        data: [],
        msg: "Username or mobile or email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    const userObj = new User({
      username: username,
      email: email,
      password: hashedPassword,
      mobile: mobile,
    });

    const user = await userObj.save();
    res.status(201).json({ data: user, msg: "User created successfully" });
  } catch (e) {
    res.status(500).json({
      error: `${e.toString()}`,
      data: [],
      msg: `Error while user creation`,
    });
  }
});

app.post("/", (req, res, next) => {
  console.log("post method");
  res.json({ msg: "post method" });
});

app.put("/", async (req, res, next) => {
  await User.findByIdAndUpdate(
    { _id: "6968929c1a60075a4084b6fe" },
    { isDeleted: false, deletedAt: null, isActive: false }
  );

  res.json({ msg: "put method" });
});

app.delete("/", (req, res, next) => {
  res.json({ msg: "delete method" });
});

app.listen(5000, () => {
  console.log("Server is running...");
});
