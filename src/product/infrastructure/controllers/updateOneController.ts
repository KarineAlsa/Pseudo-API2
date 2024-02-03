import { Request, Response } from "express";
import  UpdateOne  from "../../application/UpdateOne";

export default class UpdateOneController {

    constructor(readonly useCase:UpdateOne){}

    async run(request:Request,response:Response) {

        const id =request.params.id
        const name = request.body.name
        const price = request.body.price
        try {
            
            let orderItem = await this.useCase.run(id,name,price);

            return response.status(200).json(orderItem);

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Error to update an order",
                    error:error
                });
        }
    }

}