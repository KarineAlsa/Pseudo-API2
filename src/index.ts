import express from "express";
import productRouter from "./infrastructure/routes";

const server = express();
const server_port =1234;

server.use(express.json());
server.use("/products", productRouter);


server.listen(server_port, () => {
  console.log(`Server listening on http://localhost:${server_port}/`);
});