import {Product} from "../domain/Product";
import {ProductRepository} from "../domain/productrepository";

export default class GetAllCase {
    constructor(readonly productRepository: ProductRepository) {}

    async run(): Promise<Product | null> {
        try {
        const result = await this.productRepository.findAll();
        return result;
        } catch {
        return null;
        }
    }
}