import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    dbName: "MERN_STACK_HOSPITAL_MANAGEMENT",
  })
  .then(() => {
    console.log("connected to database!");
  })
  .catch((err) => {
    console.log(`some error occurred while connecting to database: ${err}`);
  });
};
