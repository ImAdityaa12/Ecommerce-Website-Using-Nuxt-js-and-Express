import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/userRouter";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));
const app: Express = express();
const port = process.env.PORT || 7000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);
app.use("/users", usersRouter);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
