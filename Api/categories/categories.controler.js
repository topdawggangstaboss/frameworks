import * as catModel from "./categories.model.js";

export async function getAllCategories(req, res) {
    try {
        let allCategories = await catModel.getAllCategories();
        res.json(allCategories);
    } catch (error) {
      // res.statusMessage=
      res.status(404).send(error.message);
    }
  }