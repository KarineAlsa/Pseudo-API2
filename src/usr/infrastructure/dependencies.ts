import RegisterUserCase from "../application/RegisterUserCase";
import LoginUserCase from "../application/LoginUserCase";
import ActivateUserCase from "../application/ActivateUserCase";
import GetbyIdUserCase from "../application/GetbyIdUserCase";


import UserMongooseRepository from "./MongoDBRepoUsr"
import UsertMySQLRepository from "./mysqlDBRepoUsr"

import RegisterController from './controllers/RegisterController'
import LoginController from './controllers/LoginController'
import ActivateController from './controllers/ActivateController'
import GetbyIdController from './controllers/GetbyIdController'

import { NodemailerEmailService } from "./service/mailService";

export const nodemailerEmailService = new NodemailerEmailService();

export const productMongooseRepository = new UserMongooseRepository();
export const MySqlUserRepository = new UsertMySQLRepository();
export const currentRepository =  MySqlUserRepository

export const registerCase = new RegisterUserCase(currentRepository);
export const loginUserCase = new LoginUserCase(currentRepository);
export const getbyIdUserCase = new  GetbyIdUserCase(currentRepository);
export const activateUserCase = new ActivateUserCase(currentRepository);


export const registerController = new RegisterController(registerCase, nodemailerEmailService);
export const loginController = new LoginController(loginUserCase);
export const getuserbyidController = new GetbyIdController(getbyIdUserCase);
export const activateController = new ActivateController(activateUserCase)