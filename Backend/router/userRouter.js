import express from "express";
import {
  createUser,
  deleteUser,
  getUserId,
  getUsers,
  updateUser,
  userLogin,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/getUsers", getUsers);
userRouter.get("/getUserId/:id", getUserId);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.put("/updateUser/:id", updateUser);

export default userRouter;
