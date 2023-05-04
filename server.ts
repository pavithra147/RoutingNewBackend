import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connect } from "./db";
import { signUpRoute } from "./routes/signUpRoutes";
import { detailRoute } from "./routes/detailRoutes";
import { loginRoute } from "./routes/loginRoutes";

var corsOptions = {
  origin: "http://localhost:4200",
};
connect()
  .then((data) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err || "Database not connected");
  });

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(signUpRoute());
app.use(detailRoute());
app.use(loginRoute());
app.listen(3000, () => {
  console.log("Server Started on 3000");
});
