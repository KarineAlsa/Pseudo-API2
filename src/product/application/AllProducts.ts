import {Product} from "../domain/Product";
import {ProductRepository} from "../domain/productrepository";

export default class AllProductCase {
    constructor(readonly productRepository: ProductRepository) {}

    async run(): Promise<Array<Product> | string> {
        try {
        
        const result = await this.productRepository.all();
        return result
        } catch {
        return "null";
        }
    }
}