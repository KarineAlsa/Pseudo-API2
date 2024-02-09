import { Product } from "./Product";

export interface ProductRepository {
    all():Promise<Product[]|string>;
    save(name:string|number,price:number):Promise<Product|null>;
    findById(id: string|number): Promise<Product | string>;
    delete(id:string|number):Promise<string>
    update(id:string|number,name:string,price:number):Promise<Product|string>
}