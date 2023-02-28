import * as fs from "fs/promises"; //module with method to read file

const PROD_FILE = "./products/products.json";
const USER_FILE = "./products/users.json";
const ID_FILE = "./products/userId.json";

// return all products from file
export async function getAll() {
  try {
    let productsText = await fs.readFile(PROD_FILE); //reads the entire content of PROD_FILE asyncronously
    let products = JSON.parse(productsText); //JSON string to JS object
    return products;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw new Error(`File doesn't exist`);
  }
}

// save array of products to file
async function save(products = []) {
  //if no argument is given, the products argument is []
  let productsTxt = JSON.stringify(products); //turns an array of products into JSON string
  await fs.writeFile(PROD_FILE, productsTxt); //we write the new JSON data to the file, replacing the old one if it exists
}

// Find a product by searching for the index of the current product, where id is the same as Id given in the parameter
function findProduct(productArray, Id) {
  return productArray.findIndex((currentProduct) => currentProduct.id === Id);
}

// get product by ID
export async function getProduct(id) {
  let productArray = await getAll();
  let index = findProduct(productArray, id); //find the product
  if (index === -1) throw new Error(`Product with ID:${id} doesn't exist`);
  else return productArray[index]; //returns product from specific index
}

// helper function for finding products by category
function findProducts(productArray, category) {
  let productsByCategory = [];
  productArray.forEach((product) => {
    //for each product we check if the category matches
    if (
      //better approach could be to use filter, so we didn't have to create the empty array and push products
      product.category.category1 === category ||
      product.category.category1 + product.category.category2 === category
    ) {
      productsByCategory.push(product);
    }
  });
  return productsByCategory;
}

// get array of products by category
export async function getProductsByCategory(category) {
  let productArray = await getAll(); //get all products and pass them on to helper function
  let products = findProducts(productArray, category);
  if (products.length === 0) throw new Error(`File doesn't exist`);
  //Better error message: Something went wrong and we could not find the products you are looking for.
  else return products;
}

// ----------------------------- USER / SHOPPINGCART -----------------
// return all users
export async function getUsers() {
  try {
    let userText = await fs.readFile(USER_FILE);
    let users = JSON.parse(userText);
    return users;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await saveUser([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw new Error(`File doesn't exist`);
  }
}
// save array of users to file
async function saveUser(users = []) {
  let usersTxt = JSON.stringify(users);
  await fs.writeFile(USER_FILE, usersTxt);
}

// return all id's
export async function getIds() {
  try {
    let idText = await fs.readFile(ID_FILE);
    let ids = JSON.parse(idText);
    return ids;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await saveId([]); // create a new file with empty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw new Error(`File doesn't exist`);
  }
}

// save new array of id
async function saveId(id = []) {
  let idsTxt = JSON.stringify(id);
  await fs.writeFile(ID_FILE, idsTxt);
}

// helper function for finding the user by id
function findUser(userArray, Id) {
  return userArray.findIndex((currentUser) => currentUser.userId === Id);
}

// helper function for finding the user by email
function findUserEmail(userArray, Email) {
  return userArray.findIndex((currentUser) => currentUser.email === Email);
}

// Create a shopping cart for a specific user
// We allow duplicate emails of the empty string, since this is the email we usefor our anonymous user
export async function createCart(newUser) {
  let userArray = await getUsers();
  let ids = await getIds();
  if (newUser.email !== "" && findUserEmail(userArray, newUser.email) !== -1)
    throw new Error(
      `User with Email:${newUser.email} already exist with a cart`
    );
  let userInfo = {
    userId: ids[0],
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: newUser.password,
    cart: [],
  };
  let id = ids[0];
  ids.splice(0, 1);
  await saveId(ids);
  userArray.push(userInfo);
  await saveUser(userArray);
  return id;
}

// helper function for getContent
function getProductContent(productArray, id) {
  let index = findProduct(productArray, id);
  if (index === -1) throw new Error(`Product with ID:${id} doesn't exist`);
  else return productArray[index];
}

// get content of basket for a specific user
export async function getContent(userId) {
  let cartArray = [];
  let productArray = await getAll();
  let usersArray = await getUsers();
  let index = findUser(usersArray, userId);
  if (index === -1)
    throw new Error(`User with ID:${userId} and cart doesn't exist`);
  else
    usersArray[index].cart.forEach((element) => {
      let product = getProductContent(productArray, element.id);
      let productInfo = {
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: element.quantity,
      };
      cartArray.push(productInfo);
    });
  return cartArray;
}

// update existing users cart
export async function updateCart(userId, id) {
  let userArray = await getUsers();
  let userIndex = findUser(userArray, userId);
  let productArray = await getAll();
  let productIndex = findProduct(productArray, id); // findIndex
  if (userIndex === -1) throw new Error(`User with ID:${userId} doesn't exist`);
  if (productIndex === -1)
    throw new Error(`Product with ID:${id} doesn't exist`);
  else {
    let cart = userArray[userIndex].cart;
    let changed = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].quantity = cart[i].quantity + 1;
        changed = true;
      }
    }
    if (!changed) {
      let newProduct = {
        id: id,
        quantity: 1,
      };
      cart.push(newProduct);
    }
  }
  await saveUser(userArray);
}

// remove product from the cart for a specific user
export async function removeProduct(userId, id) {
  let userArray = await getUsers();
  let userIndex = findUser(userArray, userId);
  if (userIndex === -1) throw new Error(`User with ID:${userId} doesn't exist`);
  else {
    let cart = userArray[userIndex].cart;
    let productIndex = findProduct(cart, id);
    if (productIndex === -1)
      throw new Error(`Product with ID:${id} doesn't exists in cart`);
    else {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity = cart[productIndex].quantity - 1;
      } else if (cart[productIndex].quantity === 1) {
        cart.splice(productIndex, 1);
      }
    }
  }
  await saveUser(userArray);
  return userArray[userIndex];
}
