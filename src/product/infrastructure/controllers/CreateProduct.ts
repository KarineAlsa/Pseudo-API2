import { Request, Response } from "express";
import  CreateProductCase  from "../../application/CreateProduct";

export default class CreateProductController {

    constructor(readonly useCase:CreateProductCase){}

    async run(request:Request,response:Response) {

        const name = request.body.name
        const price = request.body.price
        try {
            
            let orderItem = await this.useCase.run(name,price);

            return response.status(200).json(orderItem);

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Error to create an order",
                    error:error
                });
        }
    }

}