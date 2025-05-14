import { connect } from "mongoose";

export const connectToDataBase = async () => {
  await connect(
    "mongodb+srv://ariuka:0109@cluster0.lihhdgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("connected to database");
};
