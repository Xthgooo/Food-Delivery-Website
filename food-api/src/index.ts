import cors from "cors";

import dotenv from "dotenv";
import foodRouter from "../src/routes/food.route";
import categoryRouter from "../src/routes/category.route";
import foodOrderRouter from "../src/routes/foodOrder.route";
import userRouter from "../src/routes/user.route";
import { AuthRouter } from "../src/routes/auth.route";
import { connectToDataBase } from "../src/database/connect-to-db";

connectToDataBase();
const express = require("express");
const app = express();
const port = 3001;
dotenv.config();

app.use(cors());
app.use(express.json());

app
  .use("/food", foodRouter)
  .use("/category", categoryRouter)
  .use("/foodOrder", foodOrderRouter)
  .use("/user", userRouter)
  .use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
