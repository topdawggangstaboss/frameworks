import express from "express";
import { getAllCategories } from "./categories.controler.js";
/* import {getProductsByCategory} from './products/products.controler.js' */

export const categoriesRouter = express.Router();

// Get all categories
categoriesRouter.get("/categories", getAllCategories);

// Get products by category
/* categoriesRouter.get("/categories/:category/products", getProductsByCategory); */
