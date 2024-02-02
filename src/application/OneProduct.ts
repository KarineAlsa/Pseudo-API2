import {Product} from "../domain/product";
import {ProductRepository} from "../domain/productrepository";

export default class GetOneCase {
    constructor(readonly productRepository: ProductRepository) {}

    async run(id: string): Promise<Product | null> {
        try {
        const result = await this.productRepository.findById(id);
        return result;
        } catch {
        return null;
        }
    }
}