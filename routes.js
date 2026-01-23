import { getUsers, demo } from "./controllers/userController.js";
import express from "express";
const route = express.Router();

route.get("/users", getUsers);
route.get("/users/d", demo);

export default route;
