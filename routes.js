import {
  getUsers,
  demo,
  demoMatchStage,
  demoInsertMany,
  makeOrder,
  getOrdersAllUsers,
} from "./controllers/userController.js";
import express from "express";
const route = express.Router();

route.get("/users", getUsers);
route.get("/getOrdersAllUsers", getOrdersAllUsers);
route.post("/orders", makeOrder);
route.post("/users/many", demoInsertMany);
route.get("/users/d", demo);
route.get("/users/demoMatchStage", demoMatchStage);

export default route;
