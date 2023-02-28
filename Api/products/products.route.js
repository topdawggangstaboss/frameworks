//index.js
import express from "express";
import {
  getAllProducts,
  getProductByID,
  getProductsByCategory,
  postUser,
  getCart,
  addProduct,
  removeProduct,
} from "./products.controler.js";

export const productsRouter = express.Router();

// middleware specific to this route
productsRouter.use(express.json());

// Get most important information about all products that are offered
productsRouter.get("/products/all", getAllProducts);

// Get all products in specific category
/* productsRouter.get("/categories/:category/products", ); */
// Get all details about a specific product
productsRouter.get("/product/:id", getProductByID);

productsRouter.get("/products/:category", getProductsByCategory);

// create shoppingcart for a specific user
// productsRouter.post("/users/:id/cart", postUser);
productsRouter.post("/users", postUser);

// Get content for a specific user
productsRouter.get("/users/:id/cart", getCart);

//Put a product in the basket for a specific user
productsRouter.put("/users/:userid/cart/products/:id", addProduct);

//Remove a product in the basket for a specific user
productsRouter.delete("/users/:userid/cart/products/:id", removeProduct);
