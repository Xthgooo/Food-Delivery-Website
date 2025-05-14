import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";
import { getMe } from "../controllers/auth/getMe";
import { SignIn } from "../controllers/auth/signIn";
import { SignUp } from "../controllers/auth/signUp";

export const AuthRouter = Router()
  .get("/me", authenticationMiddleware, getMe)
  .post("/signIn", SignIn)
  .post("/signUp", SignUp);
