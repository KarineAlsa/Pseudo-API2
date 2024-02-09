import  express  from "express";
import {
    registerController,
    getuserbyidController,
    activateController,
    loginController
  } from "./dependencies";
const userRouter = express.Router();


userRouter.get("/:id", getuserbyidController.run.bind(getuserbyidController));
userRouter.get("/activate/:id", activateController.run.bind(activateController));

userRouter.post("/login", loginController.run.bind(loginController));
userRouter.post("/register", registerController.run.bind(registerController));

export default userRouter;