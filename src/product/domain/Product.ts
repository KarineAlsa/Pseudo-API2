import { ObjectId } from 'mongodb';

export class Product {
  constructor(
    
    public name: string, 
    public price: number,
    public id?:ObjectId) {}
}