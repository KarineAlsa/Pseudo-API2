import { Product } from "./Product";

export interface ProductRepository {
    all():Promise<Product[]|string>;
    save(name:string,price:number):Promise<Product|null>;
    findById(id: string): Promise<Product | string>;
    delete(id:string):Promise<string>
    update(id:string,name:string,price:number):Promise<Product|string>
}