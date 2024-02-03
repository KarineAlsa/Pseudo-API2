import CreateProduct from "../application/CreateProduct";
import UpdateOne from "../application/UpdateOne";
import DeleteOne from "../application/Delete";
import OneProduct from "../application/OneProduct";
import AllProducts from "../application/AllProducts";

import ProductMongooseRepository from "./MongoDBRepositorio"

import CreateProductController from './controllers/CreateProduct'
import UpdateOneController from './controllers/updateOneController'
import DeleteOneController from './controllers/DeleteOneController'
import GetOneProductController from './controllers/getOneController'
import GetAllProductsController from './controllers/GetAllProducts'

export const productMongooseRepository = new ProductMongooseRepository();


export const GetOneCase = new OneProduct(productMongooseRepository);
export const DeleteCase = new DeleteOne(productMongooseRepository);
export const CreateCase = new  CreateProduct(productMongooseRepository);
export const UpdateCase = new UpdateOne(productMongooseRepository);
export const GetAllCase = new AllProducts(productMongooseRepository);

export const getOneController = new GetOneProductController(GetOneCase);
export const createProductController = new CreateProductController(CreateCase);
export const updateOneController = new UpdateOneController(UpdateCase);
export const deleteOneController = new DeleteOneController(DeleteCase);
export const getAllProductsController = new GetAllProductsController(GetAllCase);