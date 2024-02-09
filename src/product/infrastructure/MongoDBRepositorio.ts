
import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/productrepository";
import { connectToDatabase } from '../../db/connectMongoDB';
import { collections } from "../../db/connectMongoDB";
import { ObjectId } from 'mongodb';


  export default class ProductMongooseRepository implements ProductRepository {
    async all(): Promise<Array<Product>|string> {
      try {
        const collectionName = "productos"
        await connectToDatabase(collectionName);
        const products = (await collections.name?.find({}).toArray());
        console.log(products);
        if (products) {
          
          return products.map((product) => new Product(product._id.toHexString(), product.name, product.price));
        } else {
        
          console.error('La consulta a la base de datos no devolvió resultados.');
          return 'Ocurrió un error';
        }
      } catch (error) {
        console.error(error);
        return 'Ocurrió un error';
      }
  
    
  }
    async save(name:string,price:number): Promise<Product> {
      try {
        const collectionName = "productos"
        await connectToDatabase(collectionName);
        
        const newProduct: Product = {
          name: name,
          price: price
        };
  
        const result = await collections.name?.insertOne(newProduct);

        if (result && result.insertedId) {
          
          return newProduct;
        } else {
          throw new Error("Error al insertar el producto en la base de datos");
        }
      }catch (error) {
        throw new Error(`Error en la operación de guardado`);
      }
    }
  
    async findById(id: string): Promise<Product | string> {
      try {
        const collectionName = "productos"
        await connectToDatabase(collectionName);
        const query = { _id: new ObjectId(id) };
        const product= (await collections.name?.findOne(query)) as Product|null;

        if (product) {
            return product
        }
    } catch (error) {
        return "No se encontró con el id"
    }
      return 'no se encontró'
    }



    async delete(id:string): Promise<string> {
      try {
        const collectionName = "productos"
        await connectToDatabase(collectionName);
        const query = { _id: new ObjectId(id) };
        const result = await collections.name?.deleteOne(query);

        if (result && result.deletedCount) {
            return `Successfully removed product with id`;
        } else if (!result) {
          return `No se pudo`;
        } else if (!result.deletedCount) {
          return `No existe`;;
        }
    } catch (error) {
        return `Sucedió un error`;;
    }

    return `Por poner algo`;

  }
    async update(id:string,name:string,price:number): Promise<Product|string> {
        
        try {
          const collectionName = "productos"
          await connectToDatabase(collectionName);
          const pudate = {
            name:name,
            price:price
          }
          const query = { _id: new ObjectId(id) };
        
          const result = await collections.name?.updateOne(query, { $set: pudate });
  
          if (result){
            return `Se actualizó correctamente`;
          }
          else{
            return 'No se pudo actualizar'
          }
      } catch (error) {
        
          return 'ocurrió un error'
      }

    }
    
  
}
