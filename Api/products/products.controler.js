import * as prodModel from "./products.model.js";

// Get most important information about all products that are offered
export async function getAllProducts(req, res) {
  try {
    let allProducts = await prodModel.getAll();
    res.json(allProducts);
  } catch (error) {
    // res.statusMessage=
    res.status(404).send(error.message);
  }
}

// get product by id
export async function getProductByID(req, res) {
  try {
    // takes the request parameter id, and parse it as an int
    let id = parseInt(req.params.id);
    // Use the getProductByID()
    let product = await prodModel.getProduct(id);
    res.json(product);
  } catch (error) {
    // Handles the error
    res.status(404).send(error.message);
  }
}

// get products by category
export async function getProductsByCategory(req, res) {
  try {
    let category = req.params.category;
    let products = await prodModel.getProductsByCategory(category);
    res.json(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// create shoppingcart for a specific user
export async function postUser(req, res) {
  try {
    let newUser = req.body;
    let id = await prodModel.createCart(newUser);
    // res.end();
    res.json(id);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

// get content of specific users cart
export async function getCart(req, res) {
  try {
    // takes the request parameter id, and parse it as an int
    let id = parseInt(req.params.id);
    // Use the getContent(id);
    let content = await prodModel.getContent(id);
    res.json(content);
  } catch (error) {
    // Handles the error
    res.status(404).send(error.message);
  }
}

// adds product to specific users cart
export async function addProduct(req, res) {
  try {
    let userId = parseInt(req.params.userid);
    let productId = parseInt(req.params.id);
    await prodModel.updateCart(userId, productId);
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// removes a product from specific users cart
export async function removeProduct(req, res) {
  try {
    let userId = parseInt(req.params.userid);
    let productId = parseInt(req.params.id);
    let content = await prodModel.removeProduct(userId, productId);
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
