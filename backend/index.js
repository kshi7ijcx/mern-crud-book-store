import express from "express";
import { port, mongoDBurl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookStore.model.js";
const app = express();

//middleware for parsing request body in form of json
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.status(234).send("Welcome to MERN Stack Tutorial");
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const allBooks = await Book.find({});
    res.status(200).json({
      count: allBooks.length,
      data: allBooks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({
        message: "Send all required fields: title, author. publishYear",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id,req.body)
    if(!result){
        res.status(404).json({message: "ID not found"})
    }
    res.status(200).send({message: "Book updated successfully"})
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

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
