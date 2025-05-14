import { Router } from "express";
import {
  addFoodOrder,
  deleteFoodOrder,
  getFoodOrdersandFilterByUser,
  getOneFoodOrder,
  updateFoodOrder,
} from "../controllers/foodOrder";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";

const foodOrderRouter = Router();

foodOrderRouter
  .get("/", getFoodOrdersandFilterByUser)
  .get(
    "/:foodOrderID",
    authenticationMiddleware,
    authorizationMiddleware,
    getOneFoodOrder
  )
  .post("/", addFoodOrder)
  .put(
    "/:foodOrderID",
    authenticationMiddleware,
    authorizationMiddleware,
    updateFoodOrder
  )
  .delete(
    "/:foodOrderID",
    authenticationMiddleware,
    authorizationMiddleware,
    deleteFoodOrder
  );

export default foodOrderRouter;
