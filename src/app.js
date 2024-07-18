import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));

app.use(cookieParser()); //to access web browser cookies

//routers import
import userRouter from "./routes/user.routes.js";

//routes declarition

app.use("/api/v1/users", userRouter);
//it will create url
//http://localhost:8000/api/v1/users/register

export { app };
