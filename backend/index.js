import express from "express";
import { port, mongoDBurl } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

//cors stands for cross origin resource sharing
//security mechanism in a browser that prevents making requests
//to handle cors policy
app.use(cors()); //* default value to allow all origins

//or using custom policy
// app.use(
//   cors({
//     origin: "http://localhost:8000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

//middleware for parsing request body in form of json
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", bookRoutes);

mongoose
  .connect(mongoDBurl)
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`server port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
