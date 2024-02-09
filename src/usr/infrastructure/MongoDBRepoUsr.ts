
import { User } from "../domain/User";
import { userRepository } from "../domain/userrepository";
import { connectToDatabase } from '../../db/connectMongoDB';
import { collections } from "../../db/connectMongoDB";
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt'

  export default class UserMongooseRepository implements userRepository {
    async all(): Promise<Array<User>|string> {
      try {
        const collectionName = "productos"
        await connectToDatabase(collectionName);
        const products = (await collections.name?.find({}).toArray());
        console.log(products);
        if (products) {
          
          return products.map((product) => new User(product._id.toHexString(), product.name, product.price, product.price));
        } else {
        
          console.error('La consulta a la base de datos no devolvió resultados.');
          return 'Ocurrió un error';
        }
      } catch (error) {
        console.error(error);
        return 'Ocurrió un error';
      }
  
    
  }
    async register(mail:string,name:string,password:string,status:boolean): Promise<User> {
      try {
        const collectionName = "users"
        await connectToDatabase(collectionName);
        const hash = bcrypt.hashSync(password, 10);
        const newUser: User = {
          mail: mail,
          name: name,
          password:hash,
          activate: status
        };
  
        const result = await collections.name?.insertOne(newUser);

        if (result && result.insertedId) {
          newUser.id = result.insertedId
          return newUser;
        } else {
          throw new Error("Error al insertar el usuario en la base de datos");
        }
      }catch (error) {
        throw new Error(`Error en la operación de guardado`);
      }
    }
  
    async activate(id: string): Promise<User | string> {
      try {
        const collectionName = "users"
        await connectToDatabase(collectionName);
        const pudate = {
            activate:true
        }
        const query = { _id: new ObjectId(id) };
        
        const user = await collections.name?.updateOne(query, { $set: pudate });
        console.log(user)
        if (user) {
            return "Usuario activado"
        }
    } catch (error) {
        return "No se encontró con el id"
    }
      return 'no se encontró'
    }



    async findById(id: string|number): Promise<User | string> {
        try {
          const collectionName = "users"
          await connectToDatabase(collectionName);
          const query = { _id: new ObjectId(id) };
          const product= (await collections.name?.findOne(query)) as User|null;
  
          if (product) {
              return product
          }
      } catch (error) {
          return "No se encontró con el id"
      }
        return 'no se encontró'
      }
    async login(id:string,mail:string,password:string): Promise<User|string|boolean> {
        
        try {
          const collectionName = "users"
          await connectToDatabase(collectionName);
          
          const query = { mail: mail };
          const product= (await collections.name?.findOne(query)) as User|null;
          if (product){
            if(bcrypt.compareSync(password, product.password) && product.activate == true){
              return true;
            }
            else{
              return "Datos incorrectos"
            }
          }
          
  
          else{
            return 'No existe el usuario'
          }
      } catch (error) {
        
          return 'ocurrió un error'
      }

    }
    
  
}
