import express from "express";
import { productsRouter } from "./products/products.route.js";
import { categoriesRouter } from "./categories/categories.route.js";
import cors from "cors";
// Create the application with express framework
const app = express();
const PORT = 5000;

app.use(cors());

// the method takes two argument: path and callback function
app.get("/", (req, res) => {
  res.send("It works");
});

app.use(productsRouter);
app.use(categoriesRouter);

// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

// tells if the application is listen on the right port or if it cannot make the server setup
app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
