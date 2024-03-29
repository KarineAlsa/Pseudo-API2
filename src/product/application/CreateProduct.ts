import {Product} from "../domain/Product";
import {ProductRepository} from "../domain/productrepository";

export default class CreateProductCase {
    constructor(readonly productRepository: ProductRepository) {}

    async run(name:string,price:number): Promise<Product | null> {
        try {
        
        const result = await this.productRepository.save(name,price);
        return result;
        } catch {
        return null;
        }
    }
}