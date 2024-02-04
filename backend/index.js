import express, { response } from "express";
import { PORT, uri } from "./config.js";
import { Book } from "./model/bookmodel.js";
import mongoose from "mongoose";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome");
});

app.post("/books", async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishyear: req.body.publishyear,
    };

    //The Book.create() method is a part of the Mongoose library.
    // It's used to create a new document (instance of a model) in the MongoDB database based on the provided data 
    // (newBook in this case).
    const book = await Book.create(newBook);
    // When using await, it waits for this Promise to resolve. 
    // Once resolved, the book variable will hold the newly created document (instance of the Book model).
    // By using await, you're essentially pausing the execution of the code until the creation of the book document is complete. 
    // This ensures that subsequent code that relies on the book variable will only execute once the book has been successfully created in the database.
    
    return res.status(201).send(book); // Send back the created book
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).send({ error: "Failed to create book" }); // Send an error response
  }
});

//:id is used for pattern matching
// /books/abc will also match, and req.params.id will be "abc".
// /books/anotherValue will match, and req.params.id will be "anotherValue".
// /books/123/edit will not match because the route pattern only matches up to the first segment after "/books/".
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.status(201).send(book);
  } catch (error) {
    console.error("Error Fetching");
    return res.status(500).send({ error: "Failed to fetch" }); // Send an error response
  }
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`App is running at: http://localhost:${PORT}`);
    });
    //app.listen inside database connect since server only needed when db is connected
  })
  .catch((error) => {
    console.log(error);
  });
