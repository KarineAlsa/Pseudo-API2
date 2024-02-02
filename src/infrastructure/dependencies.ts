import GetAll from "../application/AllProducts";
import GetOne from "../application/OneProduct";
import Delete from "../application/Delete";
import Create from "../application/CreateProduct";
import Update from "../application/UpdateOne";
import mongocon from "../infrastructure/MongoDBRepositorio";

export const GetAllCase = new GetAll(mongocon);
export const GetOneCase = new GetOne(mongocon);
export const DeleteCase = new Delete(mongocon);
export const CreateCase = new Create(mongocon);
export const UpdateCase = new Update(mongocon);
