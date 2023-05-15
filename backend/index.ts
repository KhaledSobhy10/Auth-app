import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import profileRouter from "./src/routes/profile";
const app = express();

app.use(bodyParser.json());

app.use("/api/profile", profileRouter);

app.listen(3000, () => {
  console.log("running on 3000");
});
