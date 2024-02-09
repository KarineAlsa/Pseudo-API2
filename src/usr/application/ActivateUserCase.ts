import {User} from "../domain/User";
import {userRepository} from "../domain/userrepository";

export default class GetOneCase {
    constructor(readonly productRepository: userRepository) {}

    async run(id: string|number): Promise<User | string> {
        try {
        const result = await this.productRepository.activate(id);
        return result;
        } catch {
        return 'ocurrió un error';
        }
    }
}