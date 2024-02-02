import { Product } from "../domain/Product";

export interface ProductRepository {
  save(name: string,price:number): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  delete(id:string):Promise<Product>
  update(id:string,name:string,price:number):Promise<Product>
}