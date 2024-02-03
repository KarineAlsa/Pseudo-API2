import * as mongoDB from "mongodb";

export const collections: { productos?: mongoDB.Collection } = {};

export async function connectToDatabase() {

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://localhost:27017"
  );

  await client.connect();

  const db: mongoDB.Db = client.db("prueba");

  const productCollection: mongoDB.Collection = db.collection("productos");

  collections.productos = productCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${productCollection.collectionName}`
  );
}
