import  express  from "express";
import {
    getOneController,
    createProductController,
    updateOneController,
    deleteOneController,
    getAllProductsController
  } from "./dependencies";
const productRouter = express.Router();

productRouter.get("/", getOneController.run.bind(getAllProductsController));
productRouter.get("/:id", getOneController.run.bind(getOneController));
productRouter.put("/:id", updateOneController.run.bind(updateOneController));

productRouter.delete("/:id", deleteOneController.run.bind(deleteOneController));
productRouter.post("/", createProductController.run.bind(createProductController));

export default productRouter;