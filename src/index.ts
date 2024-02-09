import express from "express";
import { connectToDatabase } from "./db/connectMongoDB";
import productRouter from "./product/infrastructure/productRoutes";
import userRoutes from "./usr/infrastructure/userRoutes";
import dotenv from 'dotenv'

dotenv.config()
const server = express();
const server_port =process.env.PORT;

server.use(express.json());
server.use("/products", productRouter);
server.use("/user", userRoutes);


server.listen(process.env.PORT, () => {
console.log(`Server listening on http://localhost:${server_port}/`);
});