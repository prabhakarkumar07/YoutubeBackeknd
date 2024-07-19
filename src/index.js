import connetDB from "./db/index.js";
import { app } from "./app.js";
// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
connetDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Db connection failed", err);
  });

/*import express from "express";
const app = express();
import(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("error", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log("server is running on port", process.env.PORT);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
})();*/
