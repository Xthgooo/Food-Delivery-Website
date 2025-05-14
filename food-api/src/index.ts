import { connectToDataBase } from "./database/connect-to-db";
import cors from "cors";
import categoryRouter from "./routes/category.route";
import foodRouter from "./routes/food.route";
import foodOrderRouter from "./routes/foodOrder.route";
import userRouter from "./routes/user.route";
import { AuthRouter } from "./routes/auth.route";
import dotenv from "dotenv";

connectToDataBase();
const express = require("express");
const app = express();
const port = 3001;
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/food", foodRouter);
app.use("/category", categoryRouter);
app.use("/foodOrder", foodOrderRouter);
app.use("/user", userRouter);
app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
