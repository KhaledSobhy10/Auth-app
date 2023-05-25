import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import profileRouter from "./src/routes/profile";
import authRouter from "./src/routes/auth";
import dotenv from 'dotenv'
import path from "path";
dotenv.config()


const app = express();

// for json
app.use(bodyParser.json());
// for x-www-form
app.use(bodyParser.urlencoded({ extended: true }));


 
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
    "X-Requested-With,content-type,Authorization"
  );

  // Pass to next layer of middleware
  next();
});

// Adding (..) to avoid going to dist folder and cause wrong path
app.use(express.static(path.join(__dirname, "..","public")));

app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);


app.listen(3000, () => {
  console.log("running on 3000");
});


// To fix nodemon issue
process.on("SIGINT", () => { console.log("exiting…"); process.exit(); });

process.on("exit", () => { console.log("exiting…"); process.exit(); });
