import {Product} from "../domain/Product";
import {ProductRepository} from "../domain/productrepository";

export default class GetOneCase {
    constructor(readonly productRepository: ProductRepository) {}

    async run(id: string): Promise<Product | string> {
        try {
        const result = await this.productRepository.findById(id);
        return result;
        } catch {
        return 'ocurrió un error';
        }
    }
}