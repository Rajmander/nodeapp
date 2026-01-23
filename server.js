import express from "express";
const app = express();

app.use(express.json());

import dbConnect from "./dbConnect.js";
import bcrypt from "bcrypt";

// IMPORT USER MODEL
import User from "./user.model.js";
import { createUserValidator } from "./validators/user.validator.js";
import { validate } from "./middlewares/validation.js";

// DEMO AGGREGATION

app.get("/demoagg", async (req, res, next) => {
  const data = await User.aggregate([
    {
      $facet: {
        totalUsers: [{ $count: "count" }],
        activeUsers: [{ $match: { isActive: true } }, { $count: "count" }],
        inActiveUsers: [{ $match: { isActive: false } }, { $count: "count" }],
        maxSalary: [
          { $group: { _id: null, maxsal: { $max: "$salary" } } },
          { $project: { _id: 0 } },
        ],
      },
    },
  ]);
  //console.log(">>>>>>>>>>>>>>>", data);
  res.json({ data });
});

app.get("/api/v1/users/single", async (req, res, next) => {
  try {
    const user = await User.find();
    res.json({ data: user });
  } catch (e) {
    console.log(e);
  }
});

app.get("/");

// Demo findOneAndUpdate
app.put("/api/v1/users/demofindOneAndUpdate", async (req, res, next) => {
  res.json({ msg: "what i catch" });
});

app.get("/api/v1/users", async (req, res, next) => {
  const userData = await User.find({
    $or: [{ deletedAt: null }, { username: "ram singh" }],
  })
    .select("id username email")
    .skip(0)
    .limit(2);
  res.json({ data: userData, count: userData.length });

  //res.json({ msg: "/api/v1/users" });
});

// DEMO FIND BY ID
app.get("/api/v1/users/:id", async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById({ _id: userId });
  res.json({ data: user });
});

// Demo find by id and update
app.put("/api/v1/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate({ _id: id }, { username: "maggi kha le 555" });
  } catch (e) {
    console.log(e);
  }
});

// demo aggregate
app.get("/demo", async (req, res, next) => {
  const user = await User.aggregate([
    //{ $group: { _id: null, maxSalary: { $avg: "$salary" } } },
    { $count: "counts" },
  ]);
  res.json({ data: user });
});

// Find One

app.post("/users", createUserValidator, validate, async (req, res, next) => {
  const { username, email, password, mobile, salary, roles } = req.body;
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
      salary: salary,
      roles: roles,
    });

    const user = await userObj.save();
    const safeObj = user.toObject();
    delete safeObj.password;
    res.status(201).json({ data: safeObj, msg: "User created successfully" });
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
    { isDeleted: false, deletedAt: null, isActive: false },
  );

  res.json({ msg: "put method" });
});

app.delete("/", (req, res, next) => {
  res.json({ msg: "delete method1" });
});

// $porject
app.get("/cheap", async (req, res, next) => {
  const data = await User.aggregate([
    {
      $addFields: {
        annualSalary: { $multiply: ["$salary", 12] },
      },
    },
    {
      $project: {
        myid: "$_id",
        _id: 0,
        annualSalary1: "$annualSalary",
      },
    },
  ]);

  res.json({ msg: data });
});

app.listen(5000, () => {
  console.log("Server is running...");
});
