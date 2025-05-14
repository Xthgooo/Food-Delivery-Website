import { Router } from "express";
import { getUser } from "../controllers/user/get-user";
import {
  CreateUser,
  DeleteUser,
  getAllUsers,
  UpdateUser,
} from "../controllers/user";

const userRouter = Router();

userRouter
  .get("/", getAllUsers)
  .get("/:userID", getUser)
  .post("/", CreateUser)
  .put("/:userID", UpdateUser)
  .delete("/:userID", DeleteUser);

export default userRouter;
