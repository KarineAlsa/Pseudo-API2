
import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/productrepository";
import { connectToDatabase } from '../../../db';
import { collections } from "../../../db";
import { ObjectId } from 'mongodb';


  export default class ProductMongooseRepository implements ProductRepository {
    async all(): Promise<Array<Product>|string> {
      try {
        await connectToDatabase();
        const products = (await collections.productos?.find({}).toArray());
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
        await connectToDatabase();
        
        const newProduct: Product = {
          name: name,
          price: price
        };
  
        const result = await collections.productos?.insertOne(newProduct);

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
        await connectToDatabase();
        const query = { _id: new ObjectId(id) };
        const product= (await collections.productos?.findOne(query)) as Product|null;

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
        await connectToDatabase();
        const query = { _id: new ObjectId(id) };
        const result = await collections.productos?.deleteOne(query);

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
          await connectToDatabase();
          const pudate = {
            name:name,
            price:price
          }
          const query = { _id: new ObjectId(id) };
        
          const result = await collections.productos?.updateOne(query, { $set: pudate });
  
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
