import { User } from "./User";

export interface userRepository {
    all():Promise<User[]|string>;
    register(mail:string,name:string,password:string,status:boolean):Promise<User|null>;
    activate(id: string|number): Promise<User | string>;
    findById(id:string|number):Promise<User|string>
    login(id:string|number,mail:string,password:string):Promise<User|string|boolean>
}