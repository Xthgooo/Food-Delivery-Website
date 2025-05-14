import { Router } from "express";
import {
  deleteCategory,
  getCategories,
  getCategoriesWithCounts,
  getCategory,
  postCategory,
  updateCategory,
} from "../controllers/category";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";

const categoryRouter = Router();

categoryRouter
  .get("/", getCategories)
  .get("/getCategoriesWithCounts", getCategoriesWithCounts)
  .get("/:categoryID", getCategory)
  .post("/", authenticationMiddleware, authorizationMiddleware, postCategory)
  .put(
    "/:categoryID",
    authenticationMiddleware,
    authorizationMiddleware,
    updateCategory
  )
  .delete(
    "/:categoryID",
    authenticationMiddleware,
    authorizationMiddleware,
    deleteCategory
  );

export default categoryRouter;
