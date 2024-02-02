import {Product} from "../domain/Product";
import {ProductRepository} from "../domain/productrepository";

export default class DeleteCase {
    constructor(readonly productRepository: ProductRepository) {}

    async run(id:string): Promise<Product | null> {
        try {
        const result = await this.productRepository.delete(id);
        return result;
        } catch {
        return null;
        }
    }
}