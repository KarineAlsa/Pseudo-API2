import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

export async function connectMongo() {
    try {
        await client.connect();
        console.log('Conexión exitosa a la base de datos MongoDB');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
    }
}

export async function disconnectMongo() {
    try {
        await client.close();
        console.log('Desconexión exitosa de MongoDB');
    } catch (error) {
        console.error('Error al cerrar la conexión de MongoDB:', error);
    }
}

export async function queryMongo(collectionName, query) {
    try {
        const database = client.db(); 
        const collection = database.collection(collectionName);
        const result = await collection.find(query).toArray();
        return result;
    } catch (error) {
        console.error('Error al ejecutar la consulta en MongoDB:', error);
        return null;
    }
}
