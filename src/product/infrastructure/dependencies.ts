import CreateProduct from "../application/CreateProduct";
import UpdateOne from "../application/UpdateOne";
import DeleteOne from "../application/Delete";
import OneProduct from "../application/OneProduct";
import AllProducts from "../application/AllProducts";

import ProductMongooseRepository from "./MongoDBRepositorio"
import ProductMySQLRepository from "./MySQLRepository"

import CreateProductController from './controllers/CreateProduct'
import UpdateOneController from './controllers/updateOneController'
import DeleteOneController from './controllers/DeleteOneController'
import GetOneProductController from './controllers/getOneController'
import GetAllProductsController from './controllers/GetAllProducts'

export const productMongooseRepository = new ProductMongooseRepository();
export const MySqlUserRepository = new ProductMySQLRepository();
export const currentRepository =  MySqlUserRepository

export const GetOneCase = new OneProduct(currentRepository);
export const DeleteCase = new DeleteOne(currentRepository);
export const CreateCase = new  CreateProduct(currentRepository);
export const UpdateCase = new UpdateOne(currentRepository);
export const GetAllCase = new AllProducts(currentRepository);

export const getOneController = new GetOneProductController(GetOneCase);
export const createProductController = new CreateProductController(CreateCase);
export const updateOneController = new UpdateOneController(UpdateCase);
export const deleteOneController = new DeleteOneController(DeleteCase);
export const getAllProductsController = new GetAllProductsController(GetAllCase);