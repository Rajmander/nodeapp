import {
  getUsers,
  demo,
  demoMatchStage,
  demoInsertMany,
} from "./controllers/userController.js";
import express from "express";
const route = express.Router();

route.get("/users", getUsers);
route.post("/users/many", demoInsertMany);
route.get("/users/d", demo);
route.get("/users/demoMatchStage", demoMatchStage);

export default route;
