import {Product} from "../domain/product";
import {ProductRepository} from "../domain/productrepository";

export default class UpdateCase {
    constructor(readonly productRepository: ProductRepository) {}

    async run(id: string,name:string,price:number): Promise<Product | null> {
        try {
        const result = await this.productRepository.update(id,name,price);
        return result;
        } catch {
        return null;
        }
    }
}