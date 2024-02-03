import  express  from "express";
import {
    getOneController,
    createProductController,
    updateOneController,
    deleteOneController,
    getAllProductsController
  } from "./dependencies";
const userRouter = express.Router();

userRouter.get("/", getOneController.run.bind(getAllProductsController));
userRouter.get("/:id", getOneController.run.bind(getOneController));
userRouter.put("/:id", updateOneController.run.bind(updateOneController));

userRouter.delete("/:id", deleteOneController.run.bind(deleteOneController));
userRouter.post("/", createProductController.run.bind(createProductController));

export default userRouter;