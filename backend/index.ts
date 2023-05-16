import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import profileRouter from "./src/routes/profile";
import authRouter from "./src/routes/auth";

const app = express();

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());

app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);


app.listen(3000, () => {
  console.log("running on 3000");
});
