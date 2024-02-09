import query from "../../db/connectMySQLDB";
import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/productrepository";

export default class MySqlUserRepository implements ProductRepository {
  async all(): Promise<Array<Product> | string> {
    const sql = "SELECT * FROM productos";
    const params: any[] = [];

    try {
      const [result]: any = await query(sql, params);
      console.log(result);
      if (result) {
        return result;
      } else {
        console.error("La consulta a la base de datos no devolvió resultados.");
        return "Ocurrió un error";
      }
    } catch (error) {
      console.error(error);
      return "Ocurrió un error";
    }
  }
  async save(name: string, price: number): Promise<Product> {
    const sql = "INSERT INTO productos (name, price) VALUES (?, ?)";
    const params: any[] = [name, price];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);

      if (result) {
        return result;
      } else {
        throw new Error("Error al insertar el producto en la base de datos");
      }
    } catch (error) {
      throw new Error(`Error en la operación de guardado`);
    }
  }

  async findById(id: string): Promise<Product | string> {
    const sql = "SELECT * FROM productos WHERE id = ?";
    const params: any[] = [id];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);

      if (result) {
        return result;
      }
    } catch (error) {
      return "No se encontró con el id";
    }
    return "no se encontró";
  }

  async delete(id: string): Promise<string> {
    const sql = "DELETE FROM productos WHERE id = ?";
    const params: any[] = [id];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);

      if (result) {
        return `Successfully removed product with id`;
      } else if (!result) {
        return `No se pudo`;
      } else if (!result) {
        return `No existe`;
      }
    } catch (error) {
      return `Sucedió un error`;
    }

    return `Por poner algo`;
  }
  async update(
    id: string,
    name?: string,
    price?: number
  ): Promise<Product | string> {
    let sql = "UPDATE productos SET";
    const params: any[] = [];

    if (name !== undefined) {
      sql += " name = ?,";
      params.push(name);
    }

    if (price !== undefined) {
      sql += " price = ?,";
      params.push(price);
    }

    if (params.length > 0) {
      sql = sql.slice(0, -1);
    } else {
      return "No se proporcionaron campos para actualizar";
    }

    sql += " WHERE id = ?";
    params.push(id);
    try {
      const [result]: any = await query(sql, params);
      console.log(result);

      if (result) {
        return `Se actualizó correctamente`;
      } else {
        return "No se pudo actualizar";
      }
    } catch (error) {
      return "ocurrió un error";
    }
  }
}
