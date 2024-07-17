import connetDB from "./db/index.js";

// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});
connetDB();

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
