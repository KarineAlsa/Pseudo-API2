import {User} from "../domain/User";
import {userRepository} from "../domain/userrepository";

export default class RegisterUseCase {
    constructor(readonly productRepository: userRepository) {}

    async run(mail:string,name: string,password:string,status:boolean): Promise<User|null> {
        
        const result = await this.productRepository.register(mail,name,password,status);
        return result;
        
    }
}