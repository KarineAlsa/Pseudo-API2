import mongoose, { Document, Schema } from 'mongoose';
import { Product } from "../domain/product";
import { ProductRepository } from "../domain/productrepository";

interface ProductModel extends Document {
    id: string;
    name: string;
    price: number;
  }
  
  const ProductSchema = new Schema<ProductModel>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
  });
  
  const ProductModel = mongoose.model<ProductModel>('Product', ProductSchema);
  
  export class ProductMongooseRepository implements ProductRepository {
    async save(name: string,price:number): Promise<Product> {
      const productDocument = new ProductModel(product);
      await productDocument.save();
    }
  
    async findById(id: string): Promise<Product | null> {
      return ProductModel.findById(id).exec();
    }

    async update(): Promise<Product> {
      return ProductModel;
    }
    async delete(): Promise<Product[]> {
        return ProductModel.find().exec();
      }
    async findAll(): Promise<Product[]> {
        return ProductModel.find().exec();
      }
}