import * as fs from "fs/promises";
const CAT_FILE = "./categories/categories.json";

// return all categories from file
export async function getAllCategories() {
    try {
      let categoriesText = await fs.readFile(CAT_FILE);
      let categories = JSON.parse(categoriesText);
      return categories;
    } catch (err) {
      if (err.code === "ENOENT") {
        // file does not exits
        await save([]); // create a new file with empty array
        return []; // return empty array
      } // // cannot handle this exception, so rethrow
      else throw new Error(`File doesn't exist`);
    }
  }
  
  // save array of categories to file
    async function save(categories = []) {
    let categoriesText = JSON.stringify(categories);
    await fs.writeFile(CAT_FILE, categoriesText);
  }