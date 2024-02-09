import {User} from "../domain/User";
import {userRepository} from "../domain/userrepository";

export default class GetOneCase {
    constructor(readonly productRepository: userRepository) {}

    async run(id: string, mail:string, password:string): Promise<User | string|boolean> {
        try {
        const result = await this.productRepository.login(id, mail,password);
        return result;
        } catch {
        return 'ocurrió un error';
        }
    }
}