import { ObjectId } from 'mongodb';

export class User {
  constructor(
    
    public mail: string, 
    public name: string,
    public password: string,
    public activate: boolean,
    public id?:ObjectId) {}
}