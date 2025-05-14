import { Router } from "express";
import {
  deleteFood,
  getAllFoodsAndFilterByCategory,
  getAllFoodsCount,
  getFood,
  postFood,
  updateFood,
} from "../controllers/food";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

const foodRouter = Router();

foodRouter
  .get("/", getAllFoodsAndFilterByCategory)
  .get("/getCount", getAllFoodsCount)
  .get("/:foodID", getFood)
  .post("/", authenticationMiddleware, authorizationMiddleware, postFood)
  .put(
    "/:foodID",
    authenticationMiddleware,
    authorizationMiddleware,
    updateFood
  )
  .delete(
    "/:foodID",
    authenticationMiddleware,
    authorizationMiddleware,
    deleteFood
  );

export default foodRouter;
