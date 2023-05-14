import express, { Request, Response } from "express";
const app = express();

app.use("/", (req: Request, res: Response) => {
  res.json("hello");
});

app.listen(3000, () => {
  console.log("running on 3000");
});
