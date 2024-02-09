import query from "../../db/connectMySQLDB";
import { User } from "../domain/User";
import { userRepository } from "../domain/userrepository";
import bcrypt from 'bcrypt'

export default class MySqlUserRepository implements userRepository {
  async all(): Promise<Array<User> | string> {
    const sql = "SELECT * FROM users";
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
  async register(mail:string,name:string,password:string,status:boolean): Promise<User> {
    const sql = "INSERT INTO users (name, mail,password,activate) VALUES (?, ?,?,?)";
    const hash = bcrypt.hashSync(password, 10);
    const params: any[] = [name, mail, hash,false];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);

      if (result) {
        result.id = result.insertId
        return result;

      } else {
        throw new Error("Error al insertar el usuario en la base de datos");
      }
    } catch (error) {
      throw new Error(`Error en la operación de guardado`);
    }
    }

  async activate(id: string|number): Promise<User | string> {
    const sql = "UPDATE users SET activate = true WHERE id = ?";
    const params: any[] = [id];
    try {
        const [result]: any = await query(sql, params);
        console.log(result);

      if (result) {
        return "usuario verificado";
      }
    } catch (error) {
      return "No se encontró con el id";
    }
    return "no se encontró";
  }

  async findById(id: string): Promise<string> {
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
  async login(id: string|number,mail: string,password: string): Promise<User | string> {
    const sql = "SELECT * FROM users WHERE mail = ?";
    const params: any[] = [mail];
    try {
      const [[result]]: any = await query(sql, params);
      console.log(result.password)
      if (result){
        if(bcrypt.compareSync(password, result.password) && result.activate == true){
          return "Login exitoso";
        }
        else{
          return "Datos incorrectos"
        }
      }
      else {
        return "No se pudo actualizar";
      }
    } catch (error) {
      return "ocurrió un error";
    }
  }
}
